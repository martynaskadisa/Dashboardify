﻿using Dashboardify.Repositories;
using System.Collections.Generic;
using Dashboardify.Contracts;
using Dashboardify.Contracts.Dashboards;

namespace Dashboardify.Handlers.Dashboards
{
    public class GetDashboardsHandler
    {
        private DashRepository _dashboardsRepository;

        public GetDashboardsHandler(string connectionString)
        {
            _dashboardsRepository = new DashRepository(connectionString);
        }

        public GetDashboardsResponse Handle(GetDashboardsRequest request)
        {
            var response = new GetDashboardsResponse();

            response.Errors = Validate(request);

            if (response.HasErrors)
            {
                return response;
            }

            var items = _dashboardsRepository.GetByUserId(request.UserId);

            response.Items = items;

            return response;
        }

        private IList<ErrorStatus> Validate(GetDashboardsRequest request)
        {
            var errors = new List<ErrorStatus>();

            if (request.UserId == 0)
            {
                errors.Add(new ErrorStatus("USERID_NOT_DEFINED"));
            }

            return errors;
        }
    }
}