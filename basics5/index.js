const svg = d3.select('svg');

d3.json('menu.json').then(data =>{

  //create linear scale
  const y = d3.scaleLinear()
    .domain([0, 1000])
    .range([0, 500]);
  
  console.log(y(400));
  console.log(y(0));
  console.log(y(900));
  

  //join data to rects
  const rects = svg.selectAll('rect')
    .data(data);

  rects.attr('width', 50)
    .attr('height', d => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d, i) => i * 70);

  rects.enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', d => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d, i) => i * 70);
})