﻿using System;

namespace Dashboardify.Models
{
    public class UserSession
    {
        public int Id { get; set; }

        public string Ticket { get; set; }
        
        public int UserId { get; set; }

        public DateTime Expires { get; set; }
         
    }
}
