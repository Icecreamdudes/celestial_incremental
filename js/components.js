var app;

function loadVue() {
	// data = a function returning the content (actually HTML)
	Vue.component('display-text', {
		props: ['layer', 'data'],
		template: `
			<span class="instant" v-html="data"></span>
		`
	})

	// data = a function returning the content (actually HTML)
	Vue.component('raw-html', {
			props: ['layer', 'data'],
			template: `
				<span class="instant"  v-html="data"></span>
			`
	})

	// Blank space, data = optional height in px or pair with width and height in px
	Vue.component('blank', {
		props: ['layer', 'data'],
		template: `
			<div class = "instant">
			<div class = "instant" v-if="!data" v-bind:style="{'width': '8px', 'height': '17px'}"></div>
			<div class = "instant" v-else-if="Array.isArray(data)" v-bind:style="{'width': data[0], 'height': data[1]}"></div>
			<div class = "instant" v-else v-bind:style="{'width': '8px', 'height': data}"><br></div>
			</div>
		`
	})

	// Displays an image, data is the URL
	Vue.component('display-image', {
		props: ['layer', 'data'],
		template: `
			<img class="instant" v-bind:src= "data" v-bind:alt= "data">
		`
	})

	// data = an array of Components to be displayed in a row
	Vue.component('row', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgRow">
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a column
	Vue.component('column', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgCol">
				<div v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a row
	// look = Object that defines style
	Vue.component('style-row', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgRow" v-bind:style="look" >
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a row
	// look = Object that defines style
	Vue.component('tooltip-row', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant">
			<div class="upgRow tooltipBox" v-bind:style="look" >
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a row
	// look = Object that defines style
	Vue.component('left-row', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgLeftTable instant">
			<div class="upgScrollRow" v-bind:style="look" >
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a column
	// look = Object that defines style
	Vue.component('style-column', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgTable instant" >
			<div class="upgCol" v-bind:style="look" >
				<div v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a row
	// look = Object that defines style
	Vue.component('scroll-row', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div id="scrCon" class="upgScrollRowTable instant">
			<div class="upgScrollRow" v-bind:style="look" >
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a row
	// look = Object that defines style
	Vue.component('always-scroll-row', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div id="scrCon" class="upgScrollRowTable upgAlwaysScrollRow instant">
			<div class="upgScrollRow" v-bind:style="look" >
				<div style="margin:0" v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a column
	// look = Object that defines style
	Vue.component('scroll-column', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div id="scrCon" class="upgScrollColTable instant" >
			<div class="upgScrollCol" v-bind:style="look" >
				<div v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of Components to be displayed in a column
	// look = Object that defines style
	Vue.component('always-scroll-column', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div id="scrCon" class="upgScrollColTable upgAlwaysScrollCol instant" >
			<div class="upgScrollCol" v-bind:style="look" >
				<div v-for="(item, index) in data">
					<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
					<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
				</div>
			</div>
		</div>
		`
	})

	// data = an array of functions returning the content (actually HTML)
	// look = Object that defines style
	Vue.component('stat-row', {
		props: ['layer', 'data', 'look'],
		template: `
		<div class="statRow instant" v-bind:style="look">
			<div class="statCell1">
				<span class="instant"  v-html="data[0]"></span>
			</div>
			<div class="statCell2">
				<span class="instant"  v-html="data[1]"></span>
			</div>
		</div>
		`
	})

	// data [other layer, tabformat for within proxy]
	Vue.component('layer-proxy', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div>
			<column :layer="data[0]" :data="data[1]" :key="key + 'col'"></column>
		</div>
		`
	})
	Vue.component('infobox', {
		props: ['layer', 'data'],
		template: `
		<div class="story instant" v-if="tmp[layer].infoboxes && tmp[layer].infoboxes[data]!== undefined && tmp[layer].infoboxes[data].unlocked" v-bind:style="[{'border-color': tmp[layer].color, 'border-radius': player.infoboxes[layer][data] ? 0 : '8px'}, tmp[layer].infoboxes[data].style]">
			<button class="story-title" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].infoboxes[data].titleStyle]"
				v-on:click="player.infoboxes[layer][data] = !player.infoboxes[layer][data]">
				<span class="story-toggle">{{player.infoboxes[layer][data] ? "+" : "-"}}</span>
				<span v-html="tmp[layer].infoboxes[data].title ? tmp[layer].infoboxes[data].title : (tmp[layer].name)"></span>
			</button>
			<div v-if="!player.infoboxes[layer][data]" class="story-text" v-bind:style="tmp[layer].infoboxes[data].bodyStyle">
				<span v-html="tmp[layer].infoboxes[data].body ? tmp[layer].infoboxes[data].body : 'Blah'"></span>
			</div>
		</div>
		`
	})


	// Data = width in px, by default fills the full area
	Vue.component('h-line', {
		props: ['layer', 'data'],
			template:`
				<hr class="instant" v-bind:style="data ? {'width': data} : {}" class="hl">
			`
		})

	// Data = height in px, by default is bad
	Vue.component('v-line', {
		props: ['layer', 'data'],
		template: `
			<div class="instant" v-bind:style="data ? {'height': data} : {}" class="vl2"></div>
		`
	})

	Vue.component('challenges', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].challenges" class="upgTable">
		<div v-for="row in (data === undefined ? tmp[layer].challenges.rows : data)" class="upgRow">
		<div v-for="col in tmp[layer].challenges.cols">
					<challenge v-if="tmp[layer].challenges[row*10+col]!== undefined && tmp[layer].challenges[row*10+col].unlocked" :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.challenge"></challenge>
				</div>
			</div>
		</div>
		`
	})

	// data = id
	Vue.component('challenge', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].challenges && tmp[layer].challenges[data]!== undefined && tmp[layer].challenges[data].unlocked && !(options.hideChallenges && maxedChallenge(layer, [data]) && !inChallenge(layer, [data]))"
			v-bind:class="['challenge', challengeStyle(layer, data), player[layer].activeChallenge === data ? 'resetNotify' : '']" v-bind:style="tmp[layer].challenges[data].style">
			<h3 v-html="tmp[layer].challenges[data].name"></h3><br>
			<button v-bind:class="{ challengeButton: true, can: tmp[layer].challenges[data].canClick, locked: !tmp[layer].challenges[data].canClick, [layer]: true }" 
				v-bind:style="[{'background-color': tmp[layer].color},tmp[layer].challenges[data].buttonStyle]" 
				v-on:click="startChallenge(layer, data)">{{challengeButtonText(layer, data)}}</button><br>
			<span v-if="layers[layer].challenges[data].fullDisplay" v-html="run(layers[layer].challenges[data].fullDisplay, layers[layer].challenges[data])"></span>
			<span v-else>
				<span v-html="tmp[layer].challenges[data].challengeDescription"></span><br>
				Goal:  <span v-if="tmp[layer].challenges[data].goalDescription" v-html="tmp[layer].challenges[data].goalDescription"></span><span v-else>{{format(tmp[layer].challenges[data].goal)}} {{tmp[layer].challenges[data].currencyDisplayName ? tmp[layer].challenges[data].currencyDisplayName : modInfo.pointsName}}</span><br>
				Reward: <span v-html="tmp[layer].challenges[data].rewardDescription"></span><br>
				<span v-if="layers[layer].challenges[data].rewardDisplay!==undefined">Currently: <span v-html="(tmp[layer].challenges[data].rewardDisplay) ? (run(layers[layer].challenges[data].rewardDisplay, layers[layer].challenges[data])) : format(tmp[layer].challenges[data].rewardEffect)"></span></span>
			</span>
			<node-mark :layer='layer' :data='tmp[layer].challenges[data].marked' :offset="20" :scale="1.5"></node-mark></span>

		</div>
		`
	})

	Vue.component('upgrades', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].upgrades" class="upgTable">
			<div v-for="row in (data === undefined ? tmp[layer].upgrades.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].upgrades.cols"><div v-if="tmp[layer].upgrades[row*10+col]!== undefined && tmp[layer].upgrades[row*10+col].unlocked" class="upgAlign">
					<upgrade :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.upgrade"></upgrade>
				</div></div>
			</div>
			<br>
		</div>
		`
	})

	// data = id
	Vue.component('upgrade', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id='"upgrade-" + layer + "-" + data' v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, tooltipBox: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
			v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), tmp[layer].upgrades[data].style]">
			<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>
			<span v-else>
				<span v-if= "tmp[layer].upgrades[data].title"><h3 v-html="tmp[layer].upgrades[data].title"></h3><br></span>
				<span v-html="tmp[layer].upgrades[data].description"></span>
				<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>
				<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
			</span>
			<tooltip v-if="tmp[layer].upgrades[data].tooltip" :text="tmp[layer].upgrades[data].tooltip"></tooltip>

			</button>
		`
	})

	// data = id
	Vue.component('id-upgrade', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id='"upgrade-" + layer + "-" + data' v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, tooltipBox: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
			v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), tmp[layer].upgrades[data].style]">
			<h3 class="idUpgrade" v-html="data"></h3>
			<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>
			<span v-else>
				<span v-if= "tmp[layer].upgrades[data].title"><h3 v-html="tmp[layer].upgrades[data].title"></h3><br></span>
				<span v-html="tmp[layer].upgrades[data].description"></span>
				<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>
				<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
			</span>
			<tooltip v-if="tmp[layer].upgrades[data].tooltip" :text="tmp[layer].upgrades[data].tooltip"></tooltip>

			</button>
		`
	})

	Vue.component('milestones', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].milestones">
			<table>
				<tr v-for="id in (data === undefined ? Object.keys(tmp[layer].milestones) : data)" v-if="tmp[layer].milestones[id]!== undefined && tmp[layer].milestones[id].unlocked && milestoneShown(layer, id)">
					<milestone :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles.milestone"></milestone>
				</tr>
			</table>
			<br>
		</div>
		`
	})

	// data = id
	Vue.component('milestone', {
		props: ['layer', 'data'],
		template: `
		<td v-if="tmp[layer].milestones && tmp[layer].milestones[data]!== undefined && milestoneShown(layer, data) && tmp[layer].milestones[data].unlocked" v-bind:style="[tmp[layer].milestones[data].style]" v-bind:class="{milestone: !hasMilestone(layer, data), tooltipBox: true, milestoneDone: hasMilestone(layer, data)}">
			<h3 v-html="tmp[layer].milestones[data].requirementDescription"></h3><br>
			<span v-html="run(layers[layer].milestones[data].effectDescription, layers[layer].milestones[data])"></span><br>
			<tooltip v-if="tmp[layer].milestones[data].tooltip" :text="tmp[layer].milestones[data].tooltip"></tooltip>

		<span v-if="(tmp[layer].milestones[data].toggles)&&(hasMilestone(layer, data))" v-for="toggle in tmp[layer].milestones[data].toggles"><toggle :layer= "layer" :data= "toggle" v-bind:style="tmp[layer].componentStyles.toggle"></toggle>&nbsp;</span></td></tr>
		`
	})

	Vue.component('toggle', {
		props: ['layer', 'data'],
		template: `
		<button class="smallUpg can" v-bind:style="{'background-color': tmp[data[0]].color}" v-on:click="toggleAuto(data)">{{player[data[0]][data[1]]?"ON":"OFF"}}</button>
		`
	})

	Vue.component('prestige-button', {
		props: ['layer', 'data'],
		template: `
		<button v-if="(tmp[layer].type !== 'none')" v-bind:class="{ [layer]: true, reset: true, locked: !tmp[layer].canReset, can: tmp[layer].canReset}"
			v-bind:style="[tmp[layer].canReset ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles['prestige-button']]"
			v-html="prestigeButtonText(layer)" v-on:click="doReset(layer)">
		</button>
		`

	})

	// Displays the main resource for the layer
	Vue.component('main-display', {
		props: ['layer', 'data'],
		template: `
		<div><span v-if="player[layer].points.lt('1e1000')">You have </span><h2 v-bind:style="{'color': tmp[layer].color, 'text-shadow': '0px 0px 10px ' + tmp[layer].color}">{{data ? format(player[layer].points, data) : formatWhole(player[layer].points)}}</h2> {{tmp[layer].resource}}<span v-if="layers[layer].effectDescription">, <span v-html="run(layers[layer].effectDescription, layers[layer])"></span></span><br><br></div>
		`
	})

	// Displays the base resource for the layer, as well as the best and total values for the layer's currency, if tracked
	Vue.component('resource-display', {
		props: ['layer'],
		template: `
		<div style="margin-top: -13px">
			<span v-if="tmp[layer].baseAmount"><br>You have {{formatWhole(tmp[layer].baseAmount)}} {{tmp[layer].baseResource}}</span>
			<span v-if="tmp[layer].passiveGeneration"><br>You are gaining {{format(tmp[layer].resetGain.times(tmp[layer].passiveGeneration))}} {{tmp[layer].resource}} per second</span>
			<br><br>
			<span v-if="tmp[layer].showBest">Your best {{tmp[layer].resource}} is {{formatWhole(player[layer].best)}}<br></span>
			<span v-if="tmp[layer].showTotal">You have made a total of {{formatWhole(player[layer].total)}} {{tmp[layer].resource}}<br></span>
		</div>
		`
	})

	Vue.component('buyables', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables" class="upgTable">
			<respec-button v-if="tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)" :layer = "layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['respec-button']]"></respec-button>
			<div v-for="row in (data === undefined ? tmp[layer].buyables.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].buyables.cols"><div v-if="tmp[layer].buyables[row*10+col]!== undefined && tmp[layer].buyables[row*10+col].unlocked" class="upgAlign" v-bind:style="{'margin-left': '7px', 'margin-right': '7px',  'height': (data ? data : 'inherit'),}">
					<buyable :layer = "layer" :data = "row*10+col"></buyable>
				</div></div>
				<br>
			</div>
		</div>
	`
	})

	Vue.component('buyable', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
			<button v-bind:class="{ buyable: true, tooltipBox: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
			v-bind:style="[tmp[layer].buyables[data].canBuy ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles.buyable, tmp[layer].buyables[data].style]"
			v-on:click="if(!interval) buyBuyable(layer, data)" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
				<span v-if= "tmp[layer].buyables[data].title"><h2 v-html="tmp[layer].buyables[data].title"></h2><br></span>
				<span v-bind:style="{'white-space': 'pre-line'}" v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>
				<node-mark :layer='layer' :data='tmp[layer].buyables[data].marked'></node-mark>
				<tooltip v-if="tmp[layer].buyables[data].tooltip" :text="tmp[layer].buyables[data].tooltip"></tooltip>

			</button>
			<br v-if="(tmp[layer].buyables[data].sellOne !== undefined && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)) || (tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false))">
			<sell-one :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-one']" v-if="(tmp[layer].buyables[data].sellOne)&& !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)"></sell-one>
			<sell-all :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-all']" v-if="(tmp[layer].buyables[data].sellAll)&& !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)"></sell-all>
		</div>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval) {
					this.interval = setInterval((function() {
						if(this.time >= 5)
							buyBuyable(this.layer, this.data)
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	Vue.component('ex-buyable', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
			<div class="exBuyableHolder tooltipBox" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].buyables[data].style]">
				<div class="exBuyableBar">
					<div class="exBuyableBarText">
						<span v-html="tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? formatWhole(player[layer].buyables[data]) : formatWhole(player[layer].buyables[data])+'/'+formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					</div>
					<div class="exBuyableBarProgress" v-bind:style="{'width': tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? '100%' : toNumber(player[layer].buyables[data].div(tmp[layer].buyables[data].purchaseLimit).mul(100))+'%',
					'background-color': tmp[layer].buyables[data].style.borderColor != undefined ? tmp[layer].buyables[data].style.borderColor : tmp[layer].buyables[data].style.backgroundColor != undefined ? tmp[layer].buyables[data].style.backgroundColor : tmp[layer].color}"></div>
				</div>
				<div class="exBuyableInfo" :id='"buyable-" + layer + "-" + data'>
					<div class="exBuyableInfo2">
						<span v-if= "tmp[layer].buyables[data].title"><h2 v-html="tmp[layer].buyables[data].title"></h2><br></span>
						<span v-bind:style="{'white-space': 'pre-line'}" v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>
					</div>
				</div>
				<div class="exBuyableRow">
					<button v-bind:class="{ exBuyableButton: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
					v-bind:style="tmp[layer].buyables[data].canBuy ? {'background-color': '#cccccc'} : {}"
					v-on:click="if(!interval) {player.f.mfactorMax=false; buyBuyable(layer, data)}" @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
					Buy 1</button>
					<button v-bind:class="{ exBuyableButton: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
					v-bind:style="tmp[layer].buyables[data].canBuy ? {'background-color': '#cccccc'} : {}"
					v-on:click="{buyMaxExBuyable(layer, data)}">
					Buy Max</button>
				</div>
				<tooltip v-if="tmp[layer].buyables[data].tooltip" :text="tmp[layer].buyables[data].tooltip"></tooltip>
			</div>
		</div>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval) {
					this.interval = setInterval((function() {
						if(this.time >= 5)
							buyBuyable(this.layer, this.data)
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	Vue.component('dark-buyable', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
			<div class="exBuyableHolder" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].buyables[data].style]">
				<div class="exBuyableBar">
					<div class="exBuyableBarText">
						<span v-html="tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? formatWhole(player[layer].buyables[data]) : formatWhole(player[layer].buyables[data])+'/'+formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					</div>
					<div class="darkBuyableBarProgress" v-bind:style="{'width': tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? '100%' : toNumber(player[layer].buyables[data].div(tmp[layer].buyables[data].purchaseLimit).mul(100))+'%',
					'background-color': tmp[layer].buyables[data].style.borderColor != undefined ? tmp[layer].buyables[data].style.borderColor : tmp[layer].buyables[data].style.backgroundColor != undefined ? tmp[layer].buyables[data].style.backgroundColor : tmp[layer].color}"></div>
				</div>
				<div class="exBuyableInfo">
					<div class="exBuyableInfo2">
						<span v-if= "tmp[layer].buyables[data].title"><h2 v-html="tmp[layer].buyables[data].title"></h2><br></span>
						<span v-bind:style="{'white-space': 'pre-line'}" v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>
					</div>
				</div>
				<div class="exBuyableRow">
					<button v-bind:class="{ darkBuyableButton1: true, tooltipBox: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
					v-bind:style="player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit) ? {'background-color': '#1a3b0f'} : tmp[layer].buyables[data].canBuy ? {'background-color': 'black'} : {'background-color': '#361e1e'}"
					v-on:click="if(!interval) {player.f.mfactorMax=false; buyBuyable(layer, data)}" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
					Buy 1</button>
					<button v-bind:class="{ darkBuyableButton2: true, tooltipBox: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
					v-bind:style="player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit) ? {'background-color': '#1a3b0f'} : tmp[layer].buyables[data].canBuy ? {'background-color': 'black'} : {'background-color': '#361e1e'}"
					v-on:click="{buyMaxExBuyable(layer, data)}" :id='"buyable-" + layer + "-" + data'>
					Buy Max</button>
				</div>
			</div>
		</div>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval) {
					this.interval = setInterval((function() {
						if(this.time >= 5)
							buyBuyable(this.layer, this.data)
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	Vue.component('jinx-buyable', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
			<button v-bind:class="{ buyable: true, tooltipBox: true, can: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
			v-bind:style="[tmp[layer].buyables[data].canBuy ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles.buyable, tmp[layer].buyables[data].style]"
			v-on:click="if(!interval) buyBuyable(layer, data)" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
				<div v-bind:class="{jinxTitle: true}" v-if="tmp[layer].buyables[data].title">
					<span v-html="tmp[layer].buyables[data].title"></span>
				</div>
				<div v-bind:class="{jinxCost: true}">
					<span v-if="!tmp[layer].buyables[data].extraAmount || tmp[layer].buyables[data].extraAmount.eq(0)" v-html="formatWhole(player[layer].buyables[data]) + '/' + formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					<span v-if="tmp[layer].buyables[data].extraAmount && tmp[layer].buyables[data].extraAmount.neq(0)" v-html="formatWhole(player[layer].buyables[data]) + '+' + formatWhole(tmp[layer].buyables[data].extraAmount) + '/' + formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					<br>
					<span v-html="'Cost: ' + format(tmp[layer].buyables[data].cost)"></span>
				</div>
				<div v-bind:class="{jinxTotal: true}" v-if="tmp[layer].buyables[data].total">
					<span v-html="tmp[layer].buyables[data].total"></span>
				</div>
				<span v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>
				<node-mark :layer='layer' :data='tmp[layer].buyables[data].marked'></node-mark>
				<tooltip v-if="tmp[layer].buyables[data].tooltip" :text="tmp[layer].buyables[data].tooltip"></tooltip>

			</button>
			<br v-if="(tmp[layer].buyables[data].sellOne !== undefined && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)) || (tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false))">
			<sell-one :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-one']" v-if="(tmp[layer].buyables[data].sellOne)&& !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)"></sell-one>
			<sell-all :layer="layer" :data="data" v-bind:style="tmp[layer].componentStyles['sell-all']" v-if="(tmp[layer].buyables[data].sellAll)&& !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)"></sell-all>
		</div>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval) {
					this.interval = setInterval((function() {
						if(this.time >= 5)
							buyBuyable(this.layer, this.data)
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	Vue.component('levelable', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].levelables && tmp[layer].levelables[data]!== undefined && tmp[layer].levelables[data].unlocked" style="display: grid">
			<button v-bind:class="{ levelableHolder: true, can: tmp[layer].levelables[data].canClick, locked: !tmp[layer].levelables[data].canClick}"
			v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].levelables[data].style]"
			v-on:click="clickLevelable(layer, data)" :id='"levelable-" + layer + "-" + data'>
				<div class="levelableTop">
					<img v-bind:src="tmp[layer].levelables[data].image" class="levelableImg"></img>
					<div v-bind:class="{levelableText: true, hide: player[layer].levelables[data][0].eq(0)&&player[layer].levelables[data][1].eq(0)}">
						<span v-html="tmp[layer].levelables[data].levelLimit.eq(Infinity) ? 'Lv ' + formatShortestWhole(player[layer].levelables[data][0]) : 'Lv ' + formatShortestWhole(player[layer].levelables[data][0])+'/'+formatShortestWhole(tmp[layer].levelables[data].levelLimit)"></span>
					</div>
				</div>
				<div class="levelableBottom">
					<div v-bind:class="{levelableBarText: true, hide: !tmp[layer].levelables[data].barShown}">
						<span v-html="player[layer].levelables[data][0].eq(tmp[layer].levelables[data].levelLimit) ? formatShortestWhole(tmp[layer].levelables[data].currency) : formatShortestWhole(tmp[layer].levelables[data].currency)+'/'+formatShortestWhole(tmp[layer].levelables[data].xpReq)"></span>
					</div>
					<div v-bind:class="{levelableBarProgress: true, hide: !tmp[layer].levelables[data].barShown}" v-bind:style="[{'width': toNumber(tmp[layer].levelables[data].currency.div(tmp[layer].levelables[data].xpReq).mul(100))+'%'}, tmp[layer].levelables[data].barStyle]"></div>
				</div>
			</button>
		</div>
		`
	})

	Vue.component('levelable-display', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="levelableDisplayHolder">
			<div class="levelableDisplayCol1">
				<div class="levelableDisplayCard" v-bind:style="{width: tmp[layer].levelables[layers[layer].levelables.index].style.width, height: tmp[layer].levelables[layers[layer].levelables.index].style.height}">
					<div class="levelableDisplayImgHolder">
						<img v-bind:src="tmp[layer].levelables[layers[layer].levelables.index].image" class="levelableImg"></img>
						<div v-bind:class="{levelableText: true, hide: layers[layer].levelables.index==0}">
							<span v-html="tmp[layer].levelables[layers[layer].levelables.index].levelLimit.eq(Infinity) ? 'Lv ' + formatShortestWhole(player[layer].levelables[layers[layer].levelables.index][0]) : 'Lv ' + formatShortestWhole(player[layer].levelables[layers[layer].levelables.index][0])+'/'+formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].levelLimit)"></span>
						</div>
					</div>
					<div class="levelableDisplayBarHolder">
						<div v-bind:class="{levelableBarText: true, hide: layers[layer].levelables.index==0}">
							<span v-html="player[layer].levelables[layers[layer].levelables.index][0].eq(tmp[layer].levelables[layers[layer].levelables.index].levelLimit) ? formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].currency) : formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].currency)+'/'+formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].xpReq)"></span>
						</div>
						<div v-bind:class="{levelableBarProgress: true, hide: layers[layer].levelables.index==0}" v-bind:style="[{'width': toNumber(tmp[layer].levelables[layers[layer].levelables.index].currency.div(tmp[layer].levelables[layers[layer].levelables.index].xpReq).mul(100))+'%'}, tmp[layer].levelables[layers[layer].levelables.index].barStyle]"></div>
					</div>
				</div>
			</div>
			<div class="levelableDisplayCol2">
				<div class="levelableDisplayText">
					<div class="levelableDisplayTitle">
						<span v-html="tmp[layer].levelables[layers[layer].levelables.index].title"></span>
					</div>
					<div class="levelableDisplayButtonHolder" v-bind:class="{hide: (tmp[layer].levelables[layers[layer].levelables.index].lore == null)}">
						<button v-bind:class="{levelableDisplayButton: true, levelableDisplayButtonSelect: layers[layer].levelables.toggle, hide: (tmp[layer].levelables[layers[layer].levelables.index].lore == null)}"
						v-on:click="(layers[layer].levelables.toggle=true)">Effects</button>
						<button v-bind:class="{levelableDisplayButton: true, levelableDisplayButtonSelect: !layers[layer].levelables.toggle, hide: (tmp[layer].levelables[layers[layer].levelables.index].lore == null)}"
						v-on:click="(layers[layer].levelables.toggle=false)">Description</button>
					</div>
					<div v-bind:class="{levelableDisplayDescription: true, hide: (!layers[layer].levelables.toggle && tmp[layer].levelables[layers[layer].levelables.index].lore != null)}"  v-bind:style="[(tmp[layer].levelables[layers[layer].levelables.index].lore == null) ? {'height': '96px'} : {'height': '79px'}]">
						<span v-html="tmp[layer].levelables[layers[layer].levelables.index].description"></span>
					</div>
					<div v-bind:class="{levelableDisplayLore: true, hide: (layers[layer].levelables.toggle || tmp[layer].levelables[layers[layer].levelables.index].lore == null)}">
						<span v-html="tmp[layer].levelables[layers[layer].levelables.index].lore"></span>
					</div>
				</div>
				<div class="levelableDisplayRow instant">
					<div v-for="(item, index) in data">
						<div v-if="!Array.isArray(item)" v-bind:is="item" :layer= "layer" v-bind:style="tmp[layer].componentStyles[item]" :key="key + '-' + index"></div>
						<div v-else-if="item.length==3" v-bind:style="[tmp[layer].componentStyles[item[0]], (item[2] ? item[2] : {})]" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" :key="key + '-' + index"></div>
						<div v-else-if="item.length==2" v-bind:is="item[0]" :layer= "layer" :data= "item[1]" v-bind:style="tmp[layer].componentStyles[item[0]]" :key="key + '-' + index"></div>
					</div>
				</div>
			</div>
		</div>
		`
	})

	Vue.component('respec-button', {
		props: ['layer', 'data'],
		template: `
			<div v-if="tmp[layer].buyables && tmp[layer].buyables.respec && !(tmp[layer].buyables.showRespec !== undefined && tmp[layer].buyables.showRespec == false)">
				<div class="tooltipBox respecCheckbox"><input type="checkbox" v-model="player[layer].noRespecConfirm" ><tooltip v-bind:text="'Disable respec confirmation'"></tooltip></div>
				<button v-on:click="respecBuyables(layer)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }" style="margin-right: 18px">{{tmp[layer].buyables.respecText ? tmp[layer].buyables.respecText : "Respec"}}</button>
			</div>
			`
	})

	Vue.component('clickables', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].clickables" class="upgTable">
			<master-button v-if="tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)" :layer = "layer" v-bind:style="[{'margin-bottom': '12px'}, tmp[layer].componentStyles['master-button']]"></master-button>
			<div v-for="row in (data === undefined ? tmp[layer].clickables.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].clickables.cols"><div v-if="tmp[layer].clickables[row*10+col]!== undefined && tmp[layer].clickables[row*10+col].unlocked" class="upgAlign" v-bind:style="{'margin-left': '7px', 'margin-right': '7px',  'height': (data ? data : 'inherit'),}">
					<clickable :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.clickable"></clickable>
				</div></div>
				<br>
			</div>
		</div>
	`
	})

	// data = id of clickable
	Vue.component('clickable', {
		props: ['layer', 'data'],
		template: `
		<button
			v-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked"
			v-bind:class="{ upg: true, tooltipBox: true, can: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, tmp[layer].clickables[data].style]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start;hover" @touchend="stop" @touchcancel="stop" @mouseenter="hover">
			<span v-if= "tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<tooltip v-if="tmp[layer].clickables[data].tooltip" :text="tmp[layer].clickables[data].tooltip"></tooltip>

		</button>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].clickables[this.data].onHold) {
					this.interval = setInterval((function() {
						let c = layers[this.layer].clickables[this.data]
						if(this.time >= 5 && run(c.canClick, c)) {
							run(c.onHold, c)
						}
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			},
			hover() {
				if (layers[this.layer].clickables[this.data].onHover) run(layers[this.layer].clickables[this.data].onHover, layers[this.layer].clickables[this.data])
			},
		},
	})

	// data = id of clickable
	Vue.component('bt-clickable', {
		props: ['layer', 'data'],
		template: `
		<button
			v-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked"
			v-bind:class="{ upg: true, tooltipBox: true, can: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, tmp[layer].clickables[data].style]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start;hover" @touchend="stop" @touchcancel="stop" @mouseenter="hover">
			<span v-if= "tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<div class='bottomTooltip' v-if="tmp[layer].clickables[data].tooltip" v-html="tmp[layer].clickables[data].tooltip"></div>

		</button>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].clickables[this.data].onHold) {
					this.interval = setInterval((function() {
						let c = layers[this.layer].clickables[this.data]
						if(this.time >= 5 && run(c.canClick, c)) {
							run(c.onHold, c)
						}
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			},
			hover() {
				if (layers[this.layer].clickables[this.data].onHover) run(layers[this.layer].clickables[this.data].onHover, layers[this.layer].clickables[this.data])
			},
		},
	})

	// data = id of clickable
	Vue.component('hoverless-clickable', {
		props: ['layer', 'data'],
		template: `
		<button
			v-if="tmp[layer].clickables && tmp[layer].clickables[data]!== undefined && tmp[layer].clickables[data].unlocked"
			v-bind:class="{ upg: true, tooltipBox: true, canHoverless: tmp[layer].clickables[data].canClick, locked: !tmp[layer].clickables[data].canClick}"
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, tmp[layer].clickables[data].style]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start;hover" @touchend="stop" @touchcancel="stop" @mouseenter="hover">
			<span v-if= "tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="tmp[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<tooltip v-if="tmp[layer].clickables[data].tooltip" :text="tmp[layer].clickables[data].tooltip"></tooltip>

		</button>
		`,
		data() { return { interval: false, time: 0,}},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].clickables[this.data].onHold) {
					this.interval = setInterval((function() {
						let c = layers[this.layer].clickables[this.data]
						if(this.time >= 5 && run(c.canClick, c)) {
							run(c.onHold, c)
						}
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			},
			hover() {
				if (layers[this.layer].clickables[this.data].onHover) run(layers[this.layer].clickables[this.data].onHover, layers[this.layer].clickables[this.data])
			},
		},
	})

	Vue.component('master-button', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].clickables && tmp[layer].clickables.masterButtonPress && !(tmp[layer].clickables.showMasterButton !== undefined && tmp[layer].clickables.showMasterButton == false)"
			v-on:click="run(tmp[layer].clickables.masterButtonPress, tmp[layer].clickables)" v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].clickables.masterButtonText ? tmp[layer].clickables.masterButtonText : "Click me!"}}</button>
	`
	})


	// data = optionally, array of rows for the grid to show
	Vue.component('grid', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].grid" class="upgTable">
			<div v-for="row in (data === undefined ? tmp[layer].grid.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].grid.cols"><div v-if="run(layers[layer].grid.getUnlocked, layers[layer].grid, row*100+col)"
					class="upgAlign" v-bind:style="{'height': 'inherit',}">
					<gridable :layer = "layer" :data = "row*100+col" v-bind:style="tmp[layer].componentStyles.gridable"></gridable>
				</div></div>
				<br>
			</div>
		</div>
	`
	})

	Vue.component('gridable', {
		props: ['layer', 'data'],
		template: `
		<button
		v-if="tmp[layer].grid && player[layer].grid[data]!== undefined && run(layers[layer].grid.getUnlocked, layers[layer].grid, data)"
		v-bind:class="{ tile: true, can: canClick, locked: !canClick, tooltipBox: true,}"
		v-bind:style="[canClick ? {'background-color': tmp[layer].color} : {}, gridRun(layer, 'getStyle', player[this.layer].grid[this.data], this.data)]"
		v-on:click="clickGrid(layer, data)"  @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
			<span v-if="layers[layer].grid.getTitle" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="gridRun(this.layer, 'getTitle', player[this.layer].grid[this.data], this.data)" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="gridRun(this.layer, 'getDisplay', player[this.layer].grid[this.data], this.data)"></span>
			<tooltip v-if="layers[layer].grid.getTooltip" :text="gridRun(this.layer, 'getTooltip', player[this.layer].grid[this.data], this.data)"></tooltip>
		</button>
		`,
		data() { return { interval: false, time: 0,}},
		computed: {
			canClick() {
				return gridRun(this.layer, 'getCanClick', player[this.layer].grid[this.data], this.data)}
		},
		methods: {
			start() {
				if (!this.interval && layers[this.layer].grid.onHold) {
					this.interval = setInterval((function() {
						if(this.time >= 5 && gridRun(this.layer, 'getCanClick', player[this.layer].grid[this.data], this.data)) {
							gridRun(this.layer, 'onHold', player[this.layer].grid[this.data], this.data)						}
						this.time = this.time+1
					}).bind(this), 50)}
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			}
		},
	})

	// data = id of microtab family
	Vue.component('microtabs', {
		props: ['layer', 'data'],
		computed: {
			currentTab() {return player.subtabs[layer][data]}
		},
		template: `
		<div v-if="tmp[layer].microtabs" :style="{'border-style': 'solid'}">
			<div class="upgTable instant">
				<tab-buttons :layer="layer" :data="tmp[layer].microtabs[data]" :name="data" v-bind:style="tmp[layer].componentStyles['tab-buttons']"></tab-buttons>
			</div>
			<layer-tab v-if="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :layer="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :embedded="true"></layer-tab>

			<column v-else v-bind:style="tmp[layer].microtabs[data][player.subtabs[layer][data]].style" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
		</div>
		`
	})

	// data = id of microtab family
	Vue.component('buttonless-microtabs', {
		props: ['layer', 'data'],
		computed: {
			currentTab() {return player.subtabs[layer][data]}
		},
		template: `
		<div v-if="tmp[layer].microtabs" :style="{'border-style': 'solid'}">
			<layer-tab v-if="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :layer="tmp[layer].microtabs[data][player.subtabs[layer][data]].embedLayer" :embedded="true"></layer-tab>

			<column v-else v-bind:style="tmp[layer].microtabs[data][player.subtabs[layer][data]].style" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
		</div>
		`
	})


	// data = id of the bar
	Vue.component('bar', {
		props: ['layer', 'data'],
		computed: {
			style() {return constructBarStyle(this.layer, this.data)}
		},
		template: `
		<div v-if="tmp[layer].bars && tmp[layer].bars[data].unlocked" v-bind:style="{'position': 'relative'}"><div v-bind:style="[tmp[layer].bars[data].style, style.dims, {'display': 'table'}]">
			<div class = "overlayTextContainer barBorder" v-bind:style="[tmp[layer].bars[data].borderStyle, style.dims]">
				<span class = "overlayText" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].textStyle]" v-html="run(layers[layer].bars[data].display, layers[layer].bars[data])"></span>
			</div>
			<div class ="barBG barBorder" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].baseStyle, tmp[layer].bars[data].borderStyle,  style.dims]">
				<div class ="fill" v-bind:style="[tmp[layer].bars[data].style, tmp[layer].bars[data].fillStyle, style.fillDims]"></div>
			</div>
		</div></div>
		`
	})


	Vue.component('achievements', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].achievements" class="upgTable">
			<div v-for="row in (data === undefined ? tmp[layer].achievements.rows : data)" class="upgRow">
				<div v-for="col in tmp[layer].achievements.cols"><div v-if="tmp[layer].achievements[row*10+col]!== undefined && tmp[layer].achievements[row*10+col].unlocked" class="upgAlign">
					<achievement :layer = "layer" :data = "row*10+col" v-bind:style="tmp[layer].componentStyles.achievement"></achievement>
				</div></div>
			</div>
			<br>
		</div>
		`
	})

	// data = id
	Vue.component('achievement', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].achievements && tmp[layer].achievements[data]!== undefined && tmp[layer].achievements[data].unlocked" v-bind:class="{ [layer]: true, achievement: true, tooltipBox:true, locked: !hasAchievement(layer, data), bought: hasAchievement(layer, data)}"
			v-bind:style="achievementStyle(layer, data)">
			<tooltip :text="
			(tmp[layer].achievements[data].tooltip == '') ? false : hasAchievement(layer, data) ? (tmp[layer].achievements[data].doneTooltip ? tmp[layer].achievements[data].doneTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : 'You did it!'))
			: (tmp[layer].achievements[data].goalTooltip ? tmp[layer].achievements[data].goalTooltip : (tmp[layer].achievements[data].tooltip ? tmp[layer].achievements[data].tooltip : 'LOCKED'))
		"></tooltip>
			<span v-if= "tmp[layer].achievements[data].name"><br><h3 v-bind:style="tmp[layer].achievements[data].textStyle" v-html="tmp[layer].achievements[data].name"></h3><br></span>
		</div>
		`
	})

	// Data is an array with the structure of the tree
	Vue.component('tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<div class="trees">
		<span class="upgRow" v-for="(row, r) in data"><table class="treeRow">
			<span v-for="(node, id) in row" style = "{width: 0px}">
				<tree-node :layer='node' :prev='layer' :abb='tmp[node].symbol' :key="key + '-' + r + '-' + id"></tree-node>
			</span>
		</table></span></div>
	`
	})

	// Data is an array with the structure of the tree
	Vue.component('row-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<div class="upgRow">
		<span class="upgTable" v-for="(row, r) in data">
			<span v-for="(node, id) in row" style = "{width: 0px}">
				<tree-node :layer='node' :prev='layer' :abb='tmp[node].symbol' :key="key + '-' + r + '-' + id"></tree-node>
			</span>
		</span></div>

	`
	})

	// Data is an array with the structure of the tree
	Vue.component('upgrade-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'upgrade'"></thing-tree>`
	})

	// Data is an array with the structure of the tree
	Vue.component('buyable-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'buyable'"></thing-tree>`
	})

	// Data is an array with the structure of the tree
	Vue.component('clickable-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<thing-tree :layer="layer" :data = "data" :type = "'clickable'"></thing-tree>`
	})

	Vue.component('thing-tree', {
		props: ['layer', 'data', 'type'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `<div>
		<span class="upgRow" v-for="(row, r) in data"><table>
			<span v-for="id in row" style = "{width: 0px; height: 0px;}" v-if="tmp[layer][type+'s'][id]!== undefined && tmp[layer][type+'s'][id].unlocked" class="upgAlign">
				<div v-bind:is="type" :layer = "layer" :data = "id" v-bind:style="tmp[layer].componentStyles[type]" class = "treeThing"></div>
			</span>
			<tr><table><button class="treeNode hidden"></button></table></tr>
		</span></div>
	`
	})

	// Data is an array with the structure of the tree
	Vue.component('tab-tree', {
		props: ['layer', 'data'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="tabHolder">
			<div class="tabRow" v-for="(row, r) in data" v-bind:class="{hide:!rowShown(data[r])}">
				<div class="tabTitleHolder">
					<div v-bind:class="{tabTitle:true,darkTabTitle:player.sma.inStarmetalChallenge}">
						<span v-html="'Row ' + r"></span>
					</div>
				</div>
				<div class="tabRowHolder">
					<span v-for="(node, id) in row" style = "{width: 0px}">
						<tab-node :layer='node' :prev='layer' :abb='tmp[node].name' :key="key + '-' + r + '-' + id"></tab-node>
					</span>
				</div>
			</div>
		</div>
	`
	})


	// Updates the value in player[layer][data]
	Vue.component('text-input', {
		props: ['layer', 'data'],
		template: `
			<input class="instant" :id="'input-' + layer + '-' + data" :value="player[layer][data].toString()" v-on:focus="focused(true)" v-on:blur="focused(false)"
			v-on:change="player[layer][data] = toValue(document.getElementById('input-' + layer + '-' + data).value, player[layer][data])">
		`
	})

	// Updates the value in player[layer][data][0]
	Vue.component('slider', {
		props: ['layer', 'data'],
		template: `
			<div class="tooltipBox">
			<tooltip :text="player[layer][data[0]]"></tooltip><input type="range" v-model="player[layer][data[0]]" :min="data[1]" :max="data[2]"></div>
		`
	})

	// Updates the value in player[layer][data[0]], options are an array in data[1]
	Vue.component('drop-down', {
		props: ['layer', 'data'],
		template: `
			<select v-model="player[layer][data[0]]">
				<option v-for="item in data[1]" v-bind:value="item">{{item}}</option>
			</select>
		`
	})
	// These are for buyables, data is the id of the corresponding buyable
	Vue.component('sell-one', {
		props: ['layer', 'data'],
		template: `
			<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellOne && !(tmp[layer].buyables[data].canSellOne !== undefined && tmp[layer].buyables[data].canSellOne == false)" v-on:click="run(tmp[layer].buyables[data].sellOne, tmp[layer].buyables[data])"
				v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellOneText ? tmp[layer].buyables.sellOneText : "Sell One"}}</button>
	`
	})
	Vue.component('sell-all', {
		props: ['layer', 'data'],
		template: `
			<button v-if="tmp[layer].buyables && tmp[layer].buyables[data].sellAll && !(tmp[layer].buyables[data].canSellAll !== undefined && tmp[layer].buyables[data].canSellAll == false)" v-on:click="run(tmp[layer].buyables[data].sellAll, tmp[layer].buyables[data])"
				v-bind:class="{ longUpg: true, can: player[layer].unlocked, locked: !player[layer].unlocked }">{{tmp[layer].buyables.sellAllText ? tmp[layer].buyables.sellAllText : "Sell All"}}</button>
	`
	})

	// SYSTEM COMPONENTS
	Vue.component('node-mark', systemComponents['node-mark'])
	Vue.component('tab-buttons', systemComponents['tab-buttons'])
	Vue.component('tree-node', systemComponents['tree-node'])
	Vue.component('tab-node', systemComponents['tab-node'])
	Vue.component('layer-tab', systemComponents['layer-tab'])
	Vue.component('overlay-head', systemComponents['overlay-head'])
	Vue.component('info-tab', systemComponents['info-tab'])
	Vue.component('options-tab', systemComponents['options-tab'])
	Vue.component('tooltip', systemComponents['tooltip'])
	Vue.component('particle', systemComponents['particle'])
	Vue.component('bg', systemComponents['bg'])


	app = new Vue({
		el: "#app",
		data: {
			player,
			tmp,
			options,
			Decimal,
			format,
			formatWhole,
			formatTime,
			formatSmall,
			focused,
			getThemeName,
			layerunlocked,
			doReset,
			buyUpg,
			buyUpgrade,
			startChallenge,
			milestoneShown,
			keepGoing,
			hasUpgrade,
			hasMilestone,
			hasAchievement,
			hasChallenge,
			maxedChallenge,
			getBuyableAmount,
			getClickableState,
			inChallenge,
			canAffordUpgrade,
			canBuyBuyable,
			canCompleteChallenge,
			subtabShouldNotify,
			subtabResetNotify,
			challengeStyle,
			challengeButtonText,
			constructBarStyle,
			constructParticleStyle,
			VERSION,
			LAYERS,
			hotkeys,
			activePopups,
			particles,
			mouseX,
			mouseY,
			shiftDown,
			ctrlDown,
			run,
			gridRun,
		},
	})
}
