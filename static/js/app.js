function giveMeThosePlost(id) {
    d3.json("../static/data/samples.json").then((data) => {
        console.log(data);
        var filteredData = data.samples.filter(d => d.id.toString() == id)[0];
        var tableTop10SampleValues = filteredData.sample_values.slice(0,10).reverse();
        console.log(tableTop10SampleValues);
        var tableTop10ids = filteredData.otu_ids.slice(0,10).reverse();
        console.log(tableTop10ids);
        var tableTop10idsText = tableTop10ids.map(id => "OTU " + id);
        console.log(tableTop10idsText);
        var tableTop10Labels = filteredData.otu_labels.slice(0,10).reverse();
        console.log(tableTop10Labels);

        var trace1 = {
            x: tableTop10SampleValues,
            y: tableTop10idsText,
            text: tableTop10Labels,
            type:'bar',
            orientation: 'h',
            marker:{
                color:'blue'
            }
        };
        var dataTrace1 = [trace1];
        var layout1 = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
        Plotly.newPlot("bar", dataTrace1, layout1);

        var trace2 = {
            x: filteredData.otu_ids, 
            y: filteredData.sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker:{
                size: filteredData.sample_values,
                color: filteredData.otu_ids
            }
        };
        var dataTrace2 = [trace2];
        var layout2 = {
            xaxis:{title: "OTU ID"},
            height: 900,
            width: 1300
        };
        Plotly.newPlot('bubble', dataTrace2,layout2);
    });
};
function giveMeThatBoxInfo (id) {

    
    d3.json("../static/data/samples.json").then((mdata) =>{
        var metaData = mdata.metadata;
        var query = metaData.filter(m => m.id.toString() == id)[0];
        var textBox = d3.select('#sample-metadata');
        textBox.html("");

        Object.entries(query).forEach((key) => {textBox.append("h5").text(key[0].toUpperCase() + " : " + key[1] + '\n');
        });
       
    });
};


function optionChanged(id) {
    giveMeThosePlost(id);
    giveMeThatBoxInfo(id);
};



function init() {

    
    var dropOptions = d3.select("#selDataset");


    
    d3.json("../static/data/samples.json").then((data) => {

        data.names.forEach(function(name){
            dropOptions.append("option").text(name).property("value");
        });
        
        
        giveMeThosePlost(data.names[0]);
        giveMeThatBoxInfo(data.names[0]);

    });
};

init();


