const axios = require("axios").default;
axios
  .get(
    "http://mod-g-loadb-1278vrytsr6cr-550194923.us-east-1.elb.amazonaws.com/marketplace/"
  )
  .then(function(response) {
    const services = getServices(response.data);
    console.log(services);
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
      score1: getWithOutTags(data[4]),
      score2: getWithOutTags(data[5])
    };
  });
};
