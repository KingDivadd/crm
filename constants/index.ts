export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
];

export const fuels = [
  {
    title: "Fuel",
    value: "",
  },
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];


export const notificationExample = [
  {title: 'High Priority Task Overdue', details: 'Task Submit Permit Application is overdue.', dateTime: 'June 13, 2024 12:45', status: 'error'},
  {title: 'New Appointment Scheduled', details: 'Appointment with John Doe on June 12, 2024.', dateTime: 'June 10, 2024 10:35', status: 'success'},
  {title: 'Sales Target Achieved', details: 'Sales team has achieved the monthly target.', dateTime: 'June 14, 2024 08:45', status: 'success'},
  {title: 'New Lead Added', details: 'A new lead has been added by Sales Rep Mike Smith.', dateTime: 'June 15, 2024 11:35', status: 'primary'},
  {title: 'Engineering Document Uploaded', details: 'New engineering drawings have been uploaded for Project #456.', dateTime: 'June 17, 2024 15:10', status: 'primary'},
  {title: 'Payment Received', details: 'Payment of $5,000 received from Jane Smith for Project #123.', dateTime: 'June 15, 2024 15:30', status: 'success'},
  {title: 'Service Ticket Raised', details: 'Service ticket "Network Issue" raised by customer John Doe.', dateTime: 'June 15, 2024 11:25', status: 'success'},
]

export const emailNotificationToggle = [
  {title: 'Lead Assignment Notification', description: 'Notifies sales or operations team members when a new lead is assigned to them.', toggle: true},
  {title: 'Appointment Reminders', description: 'Sends reminders to customers and team members about upcoming appointments.', toggle: false},
  {title: 'Task Completion Updates', description: 'Notifies users when tasks or milestones are completed.', toggle: true},
  {title: 'Daily Summary Reports', description: 'Sends daily summaries of activities, leads, sales, and other relevant metrics.', toggle: true},
  {title: 'Payment Receipts', description: 'Sends payment receipts to customers upon transaction completion.', toggle: 'true'}
]

export const pushNotificationToggle =[
  {title: 'Real-Time Lead Alerts', description: 'Instant notifications for new leads assigned to sales or operations team members.', toggle: true},
  {title: 'Task Deadlines', description: 'Alerts users about approaching deadlines for tasks or projects.', toggle: false},
  {title: 'Project Updates', description: 'Alerts for any updates or changes in ongoing projects.', toggle: true},
  {title: 'New Feedback Received', description: 'Instant notifications when new customer feedback is received.', toggle: true}
]

export const adminLogTabs = [
  {title: 'User Activity', id: 'userActivity'}, {title: 'System Logs', id: 'systemLogs'}, {title: 'Data Access Logs', id: 'dataAccessLogs'}, {title: 'API Access Logs', id: 'apiAccessLogs'}, {title: 'Audit Logs', id: 'auditLogs'}
]

export const timeZone = ['Western European Time (UTC+0)', 'Central European Time (UTC+2)', 'Eastern European Time (UTC+2)', 'Kalingrad Time (UTC+2)','Further-Eastern European Time (UTC+3)', 'Azores Time (UTC-1)', 'Armenia Time (UTC+4)', 'Kazakhstan Time (UTC+5)']

export const paymentRoute = ['PayPal', 'Stripe']

export const userResponsibilities = {
  admin: [
      'Add, edit, delete users and assign roles and permissions.', 'Configure and manage CRM settings and integrations.', 'Ensure the security of the CRM system, including data protection and user access controls.', 'Generate and view detailed reports on various metrics.', 'Monitor user activities and system usage.', 'Set up and manage system-wide alerts and notifications.', 'Oversee database integrity and perform regular backups.', 'Address and resolve system issues and bugs.'
  ],
  
  sales: ['View, manage, and follow up on leads.', 'Track the progress of leads through the sales pipeline.', 'Maintain communication with potential and existing customers.', 'Prepare and manage sales contracts and related documents.', 'Monitor sales targets and achievements.', 'Schedule and manage customer appointments using Google Calendar integration.', 'Generate sales reports and metrics.', 'Train and mentor new sales team members.'],
  
  operation: ['Oversee and track the progress of projects through various stages.', 'Coordinate workflows for HOA, engineering, permitting, and installation.', 'Assign and manage crews for different installation phases.', 'Track materials ordered, received, and delivered.', 'Set up and manage task notifications for project updates.', 'Ensure quality and compliance with project standards.', 'Address and resolve operational issues and bottlenecks.', 'Maintain detailed records of project activities and updates.',],
  
  designer: ['View and manage associated leads and sold jobs.', 'Upload and manage design contracts and related documents.', 'Communicate with customers regarding design updates and changes.', 'Receive and respond to task notifications for design-related tasks.', 'Update design specifications based on customer feedback and project requirements.', 'Collaborate with sales, operations, and engineering teams.', 'Ensure design quality and adherence to standards.', 'Generate design progress reports.'],
  
  customer: ['View the status of HOA, permits, and payments.', 'Submit and track service tickets and upload photos.', 'Access and upload payment receipts.', 'Receive notifications for stage completions and warranty information.', 'Access project-related documents and receipts.', 'Communicate with the support team regarding project updates.', 'Provide feedback and reviews for services received.', 'Manage personal account information and settings.'],
  
  technician: ['Access job details, installation dates, and project instructions.', 'Execute assigned tasks and installation phases.', 'Upload regimented photos of job progress.', 'Upload and manage bill sheets for each job.', 'Manage tools and equipment required for installations.', 'Ensure installation quality and adherence to specifications.', 'Report on job completion and any issues encountered.', 'Interact with customers on-site for service tickets and updates.'],
  
  finance: ['Monitor profit/loss for each project and track financial performance.', 'Manage bills, invoices, and receipts.', 'Handle payroll for employees and contractors.', 'Prepare and manage project budgets.', 'Track and manage project expenses and costs.', 'Generate financial reports: Monthly, quarterly, and fiscal.', 'Ensure financial compliance with relevant laws and regulations.', 'Prepare financial forecasts and projections.']
  
  }

export const credentials = [{email: 'admin@yopmail.com', password: 'adminPass_01'}, {email: 'sales@yopmail.com', password: 'salesPass_01'}]