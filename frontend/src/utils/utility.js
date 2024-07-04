

const bubbleBgColors = [
	"bg-red-500",
	"bg-orange-500",
	"bg-amber-500",
	"bg-yellow-500",
	"bg-lime-500",
	"bg-green-500",
	"bg-emerald-500",
	"bg-teal-500",
	"bg-cyan-500",
	"bg-sky-500",
	"bg-blue-500",
	"bg-indigo-500",
	"bg-violet-500",
	"bg-purple-500",
	"bg-fuchsia-500",
	"bg-pink-500",
	"bg-rose-500",
];

const technologies = [
    "Ada", "Adobe XD", "Airflow", "ALGOL", "Alpine.js", "Amazon DynamoDB", "Amazon EC2", "Amazon FreeRTOS", "Amazon RDS", "Amazon S3",
    "Ansible", "Apache Ant", "Apache Flink", "Apache Kafka", "Apache Spark", "Apache Storm", "Apache Tomcat", "APL", "Arduino", "ASP.NET",
    "Assembly", "Awk", "AWS", "AWS Lambda", "Azure", "Backbone.js", "Ballerina", "Bash", "BASIC", "Bitbucket",
    "Blender", "Blockchain", "Bootstrap", "Bower", "BPG (Border Gateway Protocol)", "Burp Suite", "C", "C#", "C++", "Caddy",
    "Caffe", "CakePHP", "Capistrano", "Cassandra", "Ceylon", "Chef", "Chainlink", "CircleCI", "Cisco Networking", "Clojure",
    "Cloudflare", "COBOL", "Cocos2d", "Coda", "CodeIgniter", "CoffeeScript", "Cognos", "Cordova", "CouchDB", "C++",
    "CrateDB", "CryEngine", "Crystal", "CSS3", "Cucumber", "D", "D3.js", "Dagger", "Dart", "Dask",
    "Databricks", "DataDog", "Delphi", "DigitalOcean", "Django", "Docker", "Dojo", "Druid", "Drupal", "Eclipse",
    "EdgeX Foundry", "Eiffel", "Elasticsearch", "Electron", "Elixir", "Elm", "Ember.js", "Erlang", "Express.js", "F#",
    "Facebook AI", "Falcon", "FastAPI", "Feathers.js", "Figma", "Firebase", "Flask", "Flutter", "Fortran", "FreeBSD",
    "Gatling", "GCP (Google Cloud Platform)", "Geany", "Gensim", "GIMP", "Git", "GitHub", "GitLab", "Gnuplot", "Go",
    "Google AI", "Google Analytics", "Google App Engine", "Google Cloud IoT", "Google Compute Engine", "Google Kubernetes Engine", "Google Tag Manager", "Gradle", "Grafana", "GraphQL",
    "Groovy", "Grunt", "Gulp", "Hadoop", "HAML", "Hapi.js", "Haskell", "Helm", "Heroku", "Hibernate",
    "Hive", "HTML5", "Hugo", "IBM Cloud", "IBM Watson", "IDL", "Io", "Ionic", "IPFS", "IPv6",
    "Jaeger", "Jasmine", "Java", "JavaScript", "Jenkins", "Jest", "JIRA", "JMeter", "Joomla", "JPA (Java Persistence API)",
    "JQuery", "JSON", "Julia", "Jupyter Notebooks", "Kafka", "Kali Linux", "Karma", "Keras", "Keycloak", "Kibana",
    "Koa", "Kotlin", "Kubernetes", "LabVIEW", "Laravel", "LESS", "Lighttpd", "LinkedIn Learning", "Linux", "Logstash",
    "Looker", "LoRaWAN", "Lua", "Magento", "MariaDB", "MATLAB", "Maven", "Maya", "Metasploit", "Meteor.js",
    "Microsoft Azure AI", "Microsoft Azure IoT", "Microsoft SQL Server", "MongoDB", "MonoGame", "MPLS", "MQTT", "MySQL", "Nagios", "NATS",
    "Neo4j", "Nest.js", "Nessus", "Next.js", "Nginx", "Nim", "NLTK", "Node.js", "NPM", "NumPy",
    "Nuxt.js", "Objective-C", "OCaml", "OpenAI GPT-3", "OpenCV", "OpenFlow", "OpenGL", "OpenID Connect", "OpenShift", "OpenStack",
    "Oracle DB", "OWASP ZAP", "Pandas", "Parcel", "Pascal", "Perl", "PHP", "Phoenix", "Piwik", "Polymer",
    "PostgreSQL", "PowerBI", "Premiere Pro", "Presto", "Prolog", "Puppet", "PureScript", "Pytorch", "Python", "Qlik",
    "Qt", "RabbitMQ", "Racket", "Raku", "Raspberry Pi", "React Native", "React.js", "Realm", "Redis", "Redux",
    "REXX", "Ripple", "Robotics Operating System (ROS)", "Rollbar", "Ruby", "Ruby on Rails", "Rust", "Sass", "Scala", "Scikit-learn",
    "Scrapy", "Scratch", "Selenium", "Sencha", "Sentry", "Silex", "Sinatra", "Sketch", "Slack", "Smarty",
    "Smalltalk", "Solidity", "SonarQube", "Spacy", "Spark", "Spring", "SQL", "SQLite", "SQS (Amazon Simple Queue Service)", "StatsD",
    "Stellar", "Stimulus", "Struts", "Stylus", "Svelte", "SVG", "Swagger", "Swift", "Symfony", "Tableau",
    "Tailwind CSS", "Tcl", "TensorFlow", "Terraform", "Thymeleaf", "Trello", "Truffle Suite", "Twilio", "TypeScript", "Ubuntu",
    "Unity", "Unreal Engine", "Vagrant", "Varnish", "VBScript", "Vercel", "VHDL", "Vim", "VirtualBox", "Visual Basic",
    "Vue.js", "W3C", "Webpack", "WebRTC", "WebSocket", "Wireshark", "WordPress", "WPF (Windows Presentation Foundation)", "Xamarin", "XML",
    "Yarn", "Yoast", "YouTrack", "Zephyr", "Zeplin", "Zig", "Zookeeper"
];


const roles = [
    "AI Engineer", "API Developer", "Application Developer", "Backend Developer", "Big Data Engineer", "Blockchain Developer", "Business Analyst", "Cloud Architect", "Cloud Engineer", "Computer Vision Engineer",
    "Cybersecurity Analyst", "Data Analyst", "Data Architect", "Data Engineer", "Data Scientist", "Database Administrator", "DevOps Engineer", "Embedded Systems Engineer", "Frontend Developer", "Full Stack Developer",
    "Game Developer", "Hardware Engineer", "Help Desk Technician", "Infrastructure Engineer", "IoT Engineer", "IT Consultant", "Machine Learning Engineer", "Mobile Developer", "Network Administrator", "Network Engineer",
    "Product Manager", "Project Manager", "QA Engineer", "Research Scientist", "Robotics Engineer", "Scrum Master", "Security Engineer", "Site Reliability Engineer", "Software Architect", "Software Developer",
    "Software Engineer", "Solutions Architect", "Support Engineer", "System Administrator", "Systems Analyst", "Test Engineer", "UI/UX Designer", "Web Developer"
];

const communications = [
    "Airtable", "Allo", "Amazon Chime", "AOL Instant Messenger", "Asana", "Basecamp", "Beekeeper", "Bitrix24", "Blink", "BlueJeans",
    "Box", "Breeze", "Buffer", "Campfire", "Chanty", "Cisco Webex", "ClickUp", "Clubhouse", "Confluence", "Dialpad",
    "Discord", "Dropbox", "Facebook Messenger", "Flock", "Flowdock", "Fuze", "Gitter", "Glip", "Google Chat", "Google Duo",
    "Google Hangouts", "Google Meet", "HipChat", "Hootsuite", "Houseparty", "iMessage", "Instagram", "Jabber", "Jitsi", "Jive",
    "Kik", "Kustomer", "Lark", "LinkedIn", "Loom", "Mattermost", "Microsoft Teams", "Miro", "Mural", "Nextcloud Talk",
    "Pexip", "Pumble", "Quip", "Redbooth", "RingCentral", "Ryver", "Salesforce Chatter", "Sametime", "SendBird", "Signal",
    "Skype", "Slack", "Snapchat", "Sococo", "Spark", "Stride", "Symphony", "Talkspirit", "TeamViewer", "Telegram",
    "Threema", "Threads", "Trello", "Trillian", "Troop Messenger", "Twist", "Twitter", "Viber", "Voxer", "Walkie",
    "WeChat", "WhatsApp", "Wickr", "Workplace by Facebook", "Yammer", "Yammer", "YouTube Live", "Zoho Cliq", "Zoho Meeting", "Zoom"
];

const getBubbleColor = (text) => {
	let hash = 0;

	for (const char of text) {
		hash += char.charCodeAt(0);
	}

	return bubbleBgColors[hash % bubbleBgColors.length];
};

// const apiDomain = "http://www.dev-fusion.com";
const apiDomain = "http://localhost:5000";

//Searches through list of tech and returns results based on partial match
const getTechnology = (tech) => {
	if (tech.length < 1) {
		return ["Searching..."];
	}

	return technologies.filter((el)=>el.toLowerCase().includes(tech.toLowerCase()))
};

const getRole = (role) => {
	if (role.length < 1) {
		return ["Searching..."];
	}

	return roles.filter((el) => el.toLowerCase().includes(role.toLowerCase()));
};

const getCommunication = (comm) => {
	if (comm.length < 1) {
		return ["Searching..."];
	}

	return communications.filter((el) => el.toLowerCase().includes(comm.toLowerCase()));
};

export { getBubbleColor, getTechnology, getRole, getCommunication, apiDomain };
