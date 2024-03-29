const data = [
  {
    width: 200,
    height: 100,
    fill: 'purple'
  },
  {
    width: 100,
    height: 60,
    fill: 'pink'
  },
  {
    width: 50,
    height: 30,
    fill: 'red'
  }
];

const svg = d3.select('svg');

const rects = svg.selectAll('rect')
  .data(data)
  
  
rects.attr('width', (d)=>{
  return d.width;
})
  .attr('height', (d)=>{
    return d.height;
  })
  .attr('fill', (d)=>{
    return d.fill;
  });// these attributes are updated for elements that are already in the DOM

rects.enter()
  .append('rect')
  .attr('width', (d) => {
    return d.width;
  })
  .attr('height', (d) => {
    return d.height;
  })
  .attr('fill', (d) => {
    return d.fill;
  });//these are updated for elements that have yet to ENTER the DOM


