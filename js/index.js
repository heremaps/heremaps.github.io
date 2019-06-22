setTimeout(() => {
   document.querySelector('header').style.backgroundImage = `url('resources/background.png')`;
}, 1000)

//Map information

const canvas = document.getElementById('map');
const map = new harp.MapView({
   canvas,
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

/*


*/

const selected = options[Math.floor(Math.random() * options.length)];

map.addEventListener(harp.MapViewEventNames.Render, () => map.lookAt(selected.center, selected.distance, selected.tilt, (selected.angle += 0.05)));
map.beginAnimation();


const projects = [
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'TIN Terrain',
      description: '3D web map rendering engine',
      language: 'JavaScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'OSS Scanner',
      description: '3D web map rendering engine',
      language: 'Python',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
   {
      name: 'harp.gl',
      description: '3D web map rendering engine',
      language: 'TypeScript',
      stargazers_count: 12,
      forks_count: 5
   },
]

const GITHUB_URL = `https://api.github.com/orgs/heremaps/repos?per_page=100`;
const numProjects = 9;
let page = 0;

fetch(GITHUB_URL)
.then(res => res.json())
.then(res => {
   const projects = res.sort((a,b) => b.stargazers_count - a.stargazers_count);
   console.log(projects);

   document.querySelector('#view-more').style.display = 'block';

   function presentProjects () {
      projects.slice(numProjects * page, numProjects * (page + 1)).forEach(project => {
         const div = document.createElement('div');
         div.classList.add('project');
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
      console.log('current project count:' + numProjects * (page+ 1));
      console.log('num projects:' + projects.length)
      if ((page + 1) * numProjects >= projects.length) {
         document.querySelector('#view-more').style.display = 'none';
      }
      page++;
      presentProjects();    
   }
   
})

document.querySelector('#year').innerText = new Date().getFullYear();