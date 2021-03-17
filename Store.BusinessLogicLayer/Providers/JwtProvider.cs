﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Store.DataAccessLayer.Entities;
using Store.Shared.Common.Exceptions;
using Store.Shared.Constants;
using Store.Shared.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Store.BusinessLogicLayer.Providers
{
    public class JwtProvider
    {
        private IOptions<JwtConnectionOptions> _connectionOptions;
        private UserManager<User> _userManager;
        private string _issuer;
        private string _audience;
        private int _lifetime;
        private int _lengthRefreshToken;
        private string _secretKey;


        public JwtProvider(IOptions<JwtConnectionOptions> connectionOptions,
                          UserManager<User> userManager)
        {
            _userManager = userManager;
            _connectionOptions = connectionOptions;
            _issuer = _connectionOptions.Value.Issuer;
            _audience = _connectionOptions.Value.Audience;
            _lifetime = _connectionOptions.Value.Lifetime;
            _lengthRefreshToken = _connectionOptions.Value.LengthRefreshToken;
            _secretKey = _connectionOptions.Value.SecretKey;
        }

        public async Task<IEnumerable<Claim>> GetUserClaimsAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ServerException(Constants.Errors.EMAIL_IS_EMPTY);
            }

            var user = await _userManager.FindByEmailAsync(email);
            var userRoles = await _userManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName)

            };

            claims.AddRange(userRoles.Select(item => new Claim(ClaimsIdentity.DefaultRoleClaimType, item)));

            new ClaimsIdentity(claims,
                Constants.Token.TOKEN,
                ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claims;
        }
        public string GenerateAccessToken(IEnumerable<Claim> claims)
        {

            var token = new JwtSecurityToken(
               issuer: _issuer,
               audience: _audience,
               claims: claims,
               notBefore: DateTime.Now,
               expires: DateTime.Now.AddMinutes(_lifetime),
               signingCredentials: new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );
            string accessToken = new JwtSecurityTokenHandler().WriteToken(token);

            return accessToken;
        }

        public string GenerateRefreshToken()
        {
            byte[] randomNumber = new byte[_lengthRefreshToken];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            var symetricKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_secretKey));
            return symetricKey;
        }

        public ClaimsPrincipal ValidateToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = GetSymmetricSecurityKey(),
                ValidateLifetime = false
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            ClaimsPrincipal principal;
            try
            {
                principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            }
            catch
            {
                throw new ServerException(Constants.Errors.PLEASE_LOGIN);
            }

            return principal;
        }
    }
}
