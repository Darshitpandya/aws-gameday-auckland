const axios = require("axios").default;
axios
  .get(
    "http://mod-g-loadb-1278vrytsr6cr-550194923.us-east-1.elb.amazonaws.com/marketplace/"
  )
  .then(function(response) {
	const services = getServices(response.data);
	
	const roamicorn = getTeamServices(services, "Roamicorn");
	const explorers = getTeamServices(services, "Explorers");
	const dolbyDigital = getTeamServices(services, "Dolby Digital");
	const cunningStunts = getTeamServices(services, "Cunning Stunts");
	const serviants = getTeamServices(services, "Serviants");
	const rainbowPoop = getTeamServices(services, "rainbow-poop");

    console.log('roamicorn', roamicorn);
    console.log("explorers", explorers);
    console.log("dolbyDigital", dolbyDigital);
    console.log("cunningStunts", cunningStunts);
    console.log("serviants", serviants);
    console.log("rainbowPoop", rainbowPoop);
  });

const getWithOutTags = data => {
  return (
    data &&
    data
      .replace("</td>", "")
      .replace("</tr>", "")
      .replace("\n", "")
      .trim()
  );
};

const getServices = html => {
  const tables = html.substring(
    html.indexOf("<table>"),
    html.indexOf("</table>")
  );
  const rows = tables.split("<tr");

  return rows.map(row => {

	const data = row.split("<td>");
	
    return {
      teamName: getWithOutTags(data[1]),
      serviceType: getWithOutTags(data[2]),
      address: getWithOutTags(data[3]),
      latency: getWithOutTags(data[4]),
      successRate: getWithOutTags(data[5])
    };
  });
};

const getTeamServices = (services, teamName) => {
	return services
		.filter(s => s.teamName === teamName);
}