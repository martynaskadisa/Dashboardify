﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dashboardify.Contracts;
using Dashboardify.Contracts.UserSession;
using Dashboardify.Repositories;

namespace Dashboardify.Handlers.UserSession
{
    public class LogoutUserHandler:BaseHandler
    {
        public UserSessionRepository _userSessionRepository;

        public LogoutUserHandler(string connectionString):base (connectionString)
        {
            _userSessionRepository = new UserSessionRepository(connectionString);
        }


        public LogoutUserResponse Handle(LogoutUserRequest request)
        {
            var response = new LogoutUserResponse();

            response.Errors = Validate(request);

            if (response.HasErrors)
            {
                return response;
            }
            try
            {
                _userSessionRepository.DeleteUserSession(request.Ticket);
            }
            catch (Exception ex)
            {
                response.Errors.Add(new ErrorStatus(ex.Message));
            }

            return response;
        }

        private IList<ErrorStatus> Validate(LogoutUserRequest request)
        {
            var errors = new List<ErrorStatus>();

            if (IsRequestNull(request))
            {
                errors.Add(new ErrorStatus("WRONG_REQUEST"));
                return errors;
            }

            if (string.IsNullOrEmpty(request.Ticket))
            {
                errors.Add(new ErrorStatus("NO_SESSION_ID_RECIEVED"));
                return errors;
            }

            return errors;
        }

    }
}
