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
	// Programming Languages
	"Python",
	"JavaScript",
	"Java",
	"C++",
	"C#",
	"Go",
	"Rust",
	"Swift",
	"Kotlin",
	"TypeScript",
	"Ruby",
	"PHP",
	"Perl",
	"R",
	"Haskell",
	"Scala",
	"Lua",
	"Elixir",
	"Erlang",
	"F#",
	"Dart",
	"Objective-C",
	"MATLAB",
	"Groovy",
	"Julia",

	// Web Development
	"HTML5",
	"CSS3",
	"React.js",
	"Angular",
	"Vue.js",
	"Node.js",
	"Django",
	"Flask",
	"Ruby on Rails",
	"ASP.NET",
	"Bootstrap",
	"SASS",
	"LESS",
	"Webpack",
	"Gulp",
	"Grunt",
	"jQuery",
	"Next.js",
	"Nuxt.js",
	"Express.js",
	"Svelte",
	"Backbone.js",
	"Meteor.js",
	"Ember.js",
	"Tailwind CSS",

	// Mobile Development
	"React Native",
	"Flutter",
	"Swift (iOS)",
	"Kotlin (Android)",
	"Xamarin",

	// Data Science & Machine Learning
	"TensorFlow",
	"PyTorch",
	"Scikit-learn",
	"Pandas",
	"NumPy",
	"Matplotlib",
	"Keras",
	"Apache Spark",
	"Hadoop",
	"Jupyter Notebooks",

	// DevOps & Cloud Computing
	"Docker",
	"Kubernetes",
	"Ansible",
	"Terraform",
	"AWS",
	"Azure",
	"Google Cloud Platform (GCP)",
	"Jenkins",
	"CircleCI",
	"Travis CI",

	// Databases
	"MySQL",
	"PostgreSQL",
	"MongoDB",
	"SQLite",
	"Redis",
	"Cassandra",
	"Elasticsearch",
	"Firebase",
	"Oracle DB",
	"Microsoft SQL Server",

	// Cybersecurity
	"Metasploit",
	"Wireshark",
	"Kali Linux",
	"Nmap",
	"Burp Suite",
	"OWASP ZAP",
	"Snort",
	"Splunk",
	"Nessus",
	"HashiCorp Vault",

	// Blockchain
	"Ethereum",
	"Hyperledger",
	"Solidity",
	"Truffle Suite",
	"Ripple",
	"Stellar",
	"EOSIO",
	"Corda",
	"Chainlink",
	"Polkadot",

	// Internet of Things (IoT)
	"Arduino",
	"Raspberry Pi",
	"MQTT",
	"Zigbee",
	"LoRaWAN",
	"Amazon FreeRTOS",
	"Google Cloud IoT",
	"Microsoft Azure IoT",
	"Particle",
	"EdgeX Foundry",

	// Artificial Intelligence
	"OpenAI GPT-3",
	"IBM Watson",
	"Google AI",
	"Microsoft Azure AI",
	"DeepMind",
	"OpenCV",
	"spaCy",
	"NLTK",
	"Reinforcement Learning frameworks",
	"AutoML tools",
	"Robotics Operating System (ROS)",

	// Game Development
	"Unity",
	"Unreal Engine",
	"Godot",
	"CryEngine",
	"Cocos2d",
	"GameMaker Studio",
	"Panda3D",
	"Lumberyard",
	"Construct 3",
	"MonoGame",

	// Networking
	"Cisco Networking",
	"Juniper Networks",
	"SDN (Software Defined Networking)",
	"5G Technology",
	"Network Function Virtualization (NFV)",
	"IPv6",
	"MPLS",
	"OpenFlow",
	"BGP (Border Gateway Protocol)",
	"Network Automation",
];

const roles = ["Project Manager", "Frontend", "API", "Database"];

const communications = [
	"Discord",
	"GitHub",
	"Instagram",
	"WhatsApp",
	"Skype",
	"Zoom",
	"LinkedIn",
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
	const search = tech.trim().split(" ");
	const re = new RegExp(search.join("|"), "i");

	return technologies.filter((entry) => re.test(entry));
};

const getRole = (role) => {
	if (role.length < 1) {
		return ["Searching..."];
	}
	const search = role.trim().split(" ");
	const re = new RegExp(search.join("|"), "i");

	return roles.filter((entry) => re.test(entry));
};

const getCommunication = (comm) => {
	if (comm.length < 1) {
		return ["Searching..."];
	}
	const search = comm.trim().split(" ");
	const re = new RegExp(search.join("|"), "i");

	return communications.filter((entry) => re.test(entry));
};

export { getBubbleColor, getTechnology, getRole, getCommunication, apiDomain };
