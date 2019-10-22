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
// const angles = pie([
//   {name: 'rent', cost: 500},
//   {name: 'food', cost: 300},
//   {name: 'fun', cost: 200}
// ]);

const arcPath = d3.arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius/2);

const colour = d3.scaleOrdinal(d3['schemeSet3'])

  // update function
const update = (data) =>{

  //update colour scale domain
  colour.domain(data.map(d => d.name));

  // join enhanced pie data to path elements
  const paths = graph.selectAll('path')
    .data(pie(data));

  // exit selection -> when user deletes data, elements need to be removed from the DOM
  paths.exit()
    .transition().duration(750)
    .attrTween('d', arcTweenExit)
    .remove();

  //handle current DOM path updates, so pie chart becomes full circle and start end angles are re-calculated
  paths.attr('d', arcPath);

  
  paths.enter()
    .append('path')
      .attr('class', 'arc')
      // .attr('d', arcPath)//this is a reference to arcpath and this passes the data into the arcPath function
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('fill', d => colour(d.data.name))
      .transition().duration(750)
        .attrTween('d', arcTweenEnter);
}

  //data array and firestore

var data = [];

db.collection('expenses').onSnapshot(res =>{
  res.docChanges().forEach( change =>{
    const doc = {...change.doc.data(), id: change.doc.id};

    switch(change.type){
      case 'added':
       data.push(doc) ;
       break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data);
});

const arcTweenEnter = (d) =>{
  var interp = d3.interpolate(d.endAngle, d.startAngle);

  return function(ticker){
    d.startAngle = interp(ticker);
    return arcPath(d);
  }
};

const arcTweenExit = (d) => {
  interp = d3.interpolate(d.startAngle, d.endAngle);

  return function (ticker) {
    d.startAngle = interp(ticker);
    return arcPath(d);
  }
};