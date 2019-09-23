const svg = d3.select('svg');

d3.json('menu.json').then(data =>{

  //create linear scale
  const y = d3.scaleLinear()
    .domain([0, 1000])//range of data values in dataset
    .range([0, 500]);//range of linear scale
  
  const x = d3.scaleBand()
    .domain(data.map(item => item.name))
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2); //width is 500px and the width and relative position of the bars is based off of the range
 
  //join data to rects
  const rects = svg.selectAll('rect')
    .data(data);

  rects.attr('width', x.bandwidth)
    .attr('height', d => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', d => x(d.name));

  rects.enter()
    .append('rect')
    .attr('width', x.bandwidth)
    .attr('height', d => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', d => x(d.name));
})