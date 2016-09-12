﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dashboardify.Contracts;
using Dashboardify.Contracts.Dashboards;
using Dashboardify.Models;
using Dashboardify.Repositories;

namespace Dashboardify.Handlers.Dashboards
{
    public class UpdateDashBoardHandler
    {
        private DashRepository _dashRepository;

        public UpdateDashBoardHandler(string connectionString)
        {
            _dashRepository = new DashRepository(connectionString);
        }

        public UpdateDashboardResponse Handle(UpdateDashboardRequest request)
        {
            var response = new UpdateDashboardResponse();

            response.Errors = Validate(request);

            if (response.HasErrors)
            {
                return response;
            }
            var dashOrigin = _dashRepository.Get(request.DashBoard.Id);

            UpdateDashObject(dashOrigin,request.DashBoard);

            _dashRepository.Update(dashOrigin);

            return response;
        }

        private void UpdateDashObject(DashBoard origin, DashBoard request)
        {
            origin.DateModified = DateTime.Now;
            origin.Name = request.Name;
        }

        public IList<ErrorStatus> Validate(UpdateDashboardRequest request)
        {
            var errors = new List<ErrorStatus>();

            if (_dashRepository.Get(request.DashBoard.Id)==null)
            {
                errors.Add(new ErrorStatus("DASH_NOT_FOUND"));
                return errors;
            }
            return errors;
        }
    }
}