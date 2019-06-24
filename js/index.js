//Map 
const map = new harp.MapView({
   canvas: document.getElementById('map'),
   theme: "resources/theme.json",
   maxVisibleDataSourceTiles: 40, 
   tileCacheSize: 100
});

map.resize(window.innerWidth, window.innerHeight);
window.onresize = () => map.resize(window.innerWidth, window.innerHeight);

const omvDataSource = new harp.OmvDataSource({
   baseUrl: "https://xyz.api.here.com/tiles/herebase.02",
   apiFormat: harp.APIFormat.XYZOMV,
   styleSetName: "tilezen",
   authenticationCode: 'AfArIuzngG4gkdhlBZkysnc',
});
map.addDataSource(omvDataSource);

//Map display options
const options = [
   //Japan
   { 
      tilt: 10, 
      distance: 4000000,
      center: new harp.GeoCoordinates(37.141262, 137.587148),
      angle: 160
   },
   //India
   { 
      tilt: 10, 
      distance: 4000000,
      center: new harp.GeoCoordinates(20.752106, 77.889426),
      angle: 160
   },
   //Europe
   { 
      tilt: 10, 
      distance: 5000000,
      center: new harp.GeoCoordinates(48.684884, 9.811884),
      angle: 160
   },
   //Bay Area
   { 
      tilt: 0, 
      distance: 80000,
      center: new harp.GeoCoordinates(37.791294, -122.358022),
      angle: 160
   }
];

//Random view is selected from options
const selected = options[Math.floor(Math.random() * options.length)];
map.addEventListener(harp.MapViewEventNames.Render, () => map.lookAt(selected.center, selected.distance, selected.tilt, (selected.angle += 0.05)));
map.beginAnimation();

//Github url for heremaps
const GITHUB_URL = `https://api.github.com/orgs/heremaps/repos?per_page=100`;
const numProjects = 9;
let page = 0;

//Fetch github repos
fetch(GITHUB_URL)
.then(res => res.json())
.then(res => {
   //Sort projects by number of stars
   const projects = res.sort((a,b) => b.stargazers_count - a.stargazers_count);
   
   //Show "show more" button
   document.querySelector('#view-more').style.display = 'block';

   function presentProjects () {
      projects.slice(numProjects * page, numProjects * (page + 1)).forEach(project => {
         const div = document.createElement('div');
         div.classList.add('project');

         //Fix for long name screwing up grid
         if (project.name === 'com.here.validate.svrl.overrides') {
            project.name = 'com.here.validate.svrl-overrides'
         }

         div.innerHTML = `\
            <div class="language">
               ${project.language || '&#8203;'}
            </div>
            <h2>
               ${project.name}
            </h2>
            <div class="icons-row" >
               <img class="stat-icons starts" src="resources/star.png">
               <span>${project.stargazers_count}</span>
               <img class="stat-icons forks" src="resources/fork.png">
               <span>${project.forks_count}</span>
            </div>
            <div class="subtitle">
               ${project.description || ''}
            </div>
            <a target="_blank" href="${project.html_url}" class="visit">
               View on Github
            </a>`;

         div.style.opacity = 0;
         document.querySelector('.projects-grid').appendChild(div);
         setTimeout(() => {
            div.style.opacity = 1;
         }, 10)
      })
   }

   presentProjects();

   document.querySelector('#view-more').onclick = () => {
      page++;
      if ((page + 1) * numProjects >= projects.length) {
         document.querySelector('#view-more').style.display = 'none';
      }
      presentProjects();    
   }
   
})

//Make sure copyright year is updated automatically
document.querySelector('#year').innerText = new Date().getFullYear();