//dimensions
const dims = {
  height: 300,
  width: 300,
  radius: 150
};

//center
const cent = {
  x: (dims.width/2 + 5),
  y: (dims.height/2 + 5)
};

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', dims.width + 150)
  .attr('height', dims.height + 150);

const graph = svg.append('g')
  .attr('transform', `translate(${cent.x}, ${cent.y})`);

//pie chart
const pie = d3.pie()
  .sort(null)
  .value(d => d.cost);

  //dummy data
const angles = pie([
  {name: 'rent', cost: 500},
  {name: 'food', cost: 300},
  {name: 'fun', cost: 200}
]);

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius/2)

  console.log(arcPath(angles[0]))