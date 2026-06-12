const fs = require('fs');

const filesToReplace = [
  {
    path: 'd:/port_jk/lib/site-data.ts',
    replacements: [
      { from: /preet/g, to: 'ajay' }
    ]
  },
  {
    path: 'd:/port_jk/app/api/resume/route.ts',
    replacements: [
      { from: /preet/g, to: 'ajay' }
    ]
  },
  {
    path: 'd:/port_jk/data/ajay/projects.json',
    replacements: [
      { from: /patelpreet332/g, to: 'apsinghrana100' }
    ]
  },
  {
    path: 'd:/port_jk/data/projects.json',
    replacements: [
      { from: /patelpreet332/g, to: 'apsinghrana100' }
    ]
  },
  {
    path: 'd:/port_jk/data/info.json',
    replacements: [
      { from: /patelpreeta3554@gmail.com/g, to: 'apsinghrana100@gmail.com' },
      { from: /patelpreet332/g, to: 'apsinghrana100' },
      { from: /patelpreeta/g, to: 'ajay-pratap-singh-883844153' }
    ]
  }
];

filesToReplace.forEach(fileObj => {
  if (fs.existsSync(fileObj.path)) {
    let content = fs.readFileSync(fileObj.path, 'utf8');
    fileObj.replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    fs.writeFileSync(fileObj.path, content);
    console.log(`Updated ${fileObj.path}`);
  } else {
    console.log(`File not found: ${fileObj.path}`);
  }
});
