//workflow: 1. set up d3 domains that do not rely on data
// 2. set up listener to database
//3. create updater that takes in the data for the visualization

const svg = d3.select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

//create margins and dimensions
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// graph.append('rect');
// graph.append('rect');
// graph.append('rect');
// graph.append('rect');
// graph.append('rect');
// graph.append('rect');
// graph.append('rect');

const xAxisGroup = graph.append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

//scales
const y = d3.scaleLinear()
  .range([graphHeight, 0]);//range of linear scale

const x = d3.scaleBand()
  .range([0, 500])
  .paddingInner(0.2)
  .paddingOuter(0.2); //width is 500px and the width and relative position of the bars is based off of the range


//create and call the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y)
  .ticks(3)
  .tickFormat(d => d + ' orders');

  //update xaxis text
xAxisGroup.selectAll('text')
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', 'blue');

//transition
const trans = d3.transition().duration(1000);

//update cycle for d3
const update = (data) => {
  //1. update scales (domains) if they rely on our data
  y .domain([0, d3.max(data, d => d.orders)])//range of data values in dataset
  x.domain(data.map(item => item.name))

  //2. join update data to elements
  const rects = graph.selectAll('rect').data(data);

  //3. remove unnecessary shapes with exit selection
  rects.exit().remove();

  //4. update current shapes in dom
  rects.attr('width', x.bandwidth)
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
    // .transition(trans)
    //   .attr('height', d => graphHeight - y(d.orders))//ending position
    //   .attr('y', d => y(d.orders));

  //5. append enter selection to dom
  rects.enter()
    .append('rect')
    .attr('width', 0)//not necessary as it's defined in the widthTween
    .attr('height', 0)
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
    .attr('y', graphHeight)
    .merge(rects)//this applies to both groups not just the enter groups
      .transition(trans)
        .attrTween('width', widthTween)
        .attr('y', d => y(d.orders))
        .attr('height', d => graphHeight - y(d.orders));

  // call axis
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

}

var data = [];
//get data from firestore. This is a real time listener that monitors change and updates the data collection
db.collection('dishes').onSnapshot(res =>{
  res.docChanges().forEach(change =>{
    const doc = {...change.doc.data(), id: change.doc.id};
    
    switch (change.type){
      case 'added':
        data.push(doc);
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

const widthTween = (d)=>{
  let interPol = d3.interpolate(0, x.bandwidth());
  //return a function which takes in a time ticker 't'
  return function(t){
    //return value from passing ticker into interPol
    return interPol(t);
  }
}
