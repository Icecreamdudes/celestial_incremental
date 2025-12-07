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
	Vue.component('top-column', {
		props: ['layer', 'data', 'look'],
		computed: {
			key() {return this.$vnode.key}
		},
		template: `
		<div class="upgScrollCol instant" >
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
		<div class="story instant" v-if="tmp[layer].infoboxes && tmp[layer].infoboxes[data]!== undefined && tmp[layer].infoboxes[data].unlocked" v-bind:style="[{'border-color': tmp[layer].color, 'border-radius': player.infoboxes[layer][data] ? 0 : '8px'}, run(layers[layer].infoboxes[data].style, layers[layer].infoboxes[data])]">
			<button class="story-title" v-bind:style="[{'background-color': tmp[layer].color}, tmp[layer].infoboxes[data].titleStyle]"
				v-on:click="player.infoboxes[layer][data] = !player.infoboxes[layer][data]">
				<span class="story-toggle">{{player.infoboxes[layer][data] ? "+" : "-"}}</span>
				<span v-html="layers[layer].infoboxes[data].title ? run(layers[layer].infoboxes[data].title, layers[layer].infoboxes[data]) : (tmp[layer].name)"></span>
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
			v-bind:class="['challenge', challengeStyle(layer, data), player[layer].activeChallenge === data ? 'resetNotify' : '']" v-bind:style="run(layers[layer].challenges[data].style, layers[layer].challenges[data])">
			<h3 v-html="tmp[layer].challenges[data].name"></h3><br>
			<button v-bind:class="{ challengeButton: true, can: tmp[layer].challenges[data].canClick, locked: !tmp[layer].challenges[data].canClick, [layer]: true }" 
				v-bind:style="[{'background-color': tmp[layer].color},tmp[layer].challenges[data].buttonStyle]" 
				v-on:click="startChallenge(layer, data)">{{challengeButtonText(layer, data)}}</button><br>
			<span v-if="layers[layer].challenges[data].fullDisplay" v-html="run(layers[layer].challenges[data].fullDisplay, layers[layer].challenges[data])"></span>
			<span v-else>
				<span v-html="run(layers[layer].challenges[data].challengeDescription, layers[layer].challenges[data])"></span><br>
				Goal:  <span v-if="layers[layer].challenges[data].goalDescription" v-html="run(layers[layer].challenges[data].goalDescription, layers[layer].challenges[data])"></span><span v-else>{{format(tmp[layer].challenges[data].goal)}} {{tmp[layer].challenges[data].currencyDisplayName ? tmp[layer].challenges[data].currencyDisplayName : modInfo.pointsName}}</span><br>
				Reward: <span v-html="run(layers[layer].challenges[data].rewardDescription, layers[layer].challenges[data])"></span><br>
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
			v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), run(layers[layer].upgrades[data].style, layers[layer].upgrades[data])]">
			<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>
			<span v-else>
				<span v-if= "layers[layer].upgrades[data].title"><h3 v-html="run(layers[layer].upgrades[data].title, layers[layer].upgrades[data])"></h3><br></span>
				<span v-html="run(layers[layer].upgrades[data].description, layers[layer].upgrades[data])"></span>
				<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>
				<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
			</span>
			<tooltip v-if="layers[layer].upgrades[data].tooltip" :text="run(layers[layer].upgrades[data].tooltip, layers[layer].upgrades[data])"></tooltip>

			</button>
		`
	})

	// data = id
	Vue.component('bt-upgrade', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id='"upgrade-" + layer + "-" + data' v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, tooltipBox: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
			v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), run(layers[layer].upgrades[data].style, layers[layer].upgrades[data])]">
			<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>
			<span v-else>
				<span v-if= "layers[layer].upgrades[data].title"><h3 v-html="run(layers[layer].upgrades[data].title, layers[layer].upgrades[data])"></h3><br></span>
				<span v-html="run(layers[layer].upgrades[data].description, layers[layer].upgrades[data])"></span>
				<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>
				<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
			</span>
			<div class='bottomTooltip' v-if="layers[layer].upgrades[data].tooltip" v-html="run(layers[layer].upgrades[data].tooltip, layers[layer].upgrades[data])"></div>

			</button>
		`
	})

	// data = id
	Vue.component('id-upgrade', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id='"upgrade-" + layer + "-" + data' v-on:click="buyUpg(layer, data)" v-bind:class="{ [layer]: true, tooltipBox: true, upg: true, bought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), can: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
			v-bind:style="[((!hasUpgrade(layer, data) && canAffordUpgrade(layer, data)) ? {'background-color': tmp[layer].color} : {}), run(layers[layer].upgrades[data].style, layers[layer].upgrades[data])]">
			<h3 class="idUpgrade" v-html="data"></h3>
			<span v-if="layers[layer].upgrades[data].fullDisplay" v-html="run(layers[layer].upgrades[data].fullDisplay, layers[layer].upgrades[data])"></span>
			<span v-else>
				<span v-if= "layers[layer].upgrades[data].title"><h3 v-html="run(layers[layer].upgrades[data].title, layers[layer].upgrades[data])"></h3><br></span>
				<span v-html="run(layers[layer].upgrades[data].description, layers[layer].upgrades[data])"></span>
				<span v-if="layers[layer].upgrades[data].effectDisplay"><br>Currently: <span v-html="run(layers[layer].upgrades[data].effectDisplay, layers[layer].upgrades[data])"></span></span>
				<br><br>Cost: {{ formatWhole(tmp[layer].upgrades[data].cost) }} {{(tmp[layer].upgrades[data].currencyDisplayName ? tmp[layer].upgrades[data].currencyDisplayName : tmp[layer].resource)}}
			</span>
			<tooltip v-if="layers[layer].upgrades[data].tooltip" :text="run(layers[layer].upgrades[data].tooltip, layers[layer].upgrades[data])"></tooltip>

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
		<td v-if="tmp[layer].milestones && tmp[layer].milestones[data]!== undefined && milestoneShown(layer, data) && tmp[layer].milestones[data].unlocked" v-bind:style="[run(layers[layer].milestones[data].style, layers[layer].milestones[data])]" v-bind:class="{milestone: !hasMilestone(layer, data), tooltipBox: true, milestoneDone: hasMilestone(layer, data)}">
			<h3 v-html="run(layers[layer].milestones[data].requirementDescription, layers[layer].milestones[data])"></h3><br>
			<span v-html="run(layers[layer].milestones[data].effectDescription, layers[layer].milestones[data])"></span><br>
			<tooltip v-if="layers[layer].milestones[data].tooltip" :text="run(layers[layer].milestones[data].tooltip, layers[layer].milestones[data])"></tooltip>

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
			v-bind:style="[tmp[layer].buyables[data].canBuy ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles.buyable, run(layers[layer].buyables[data].style, layers[layer].buyables[data])]"
			v-on:click="if(!interval) buyBuyable(layer, data)" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
				<span v-if= "layers[layer].buyables[data].title"><h2 v-html="run(layers[layer].buyables[data].title, layers[layer].buyables[data])"></h2><br></span>
				<span v-bind:style="{'white-space': 'pre-line'}" v-html="run(layers[layer].buyables[data].display, layers[layer].buyables[data])"></span>
				<node-mark :layer='layer' :data='tmp[layer].buyables[data].marked'></node-mark>
				<tooltip v-if="layers[layer].buyables[data].tooltip" :text="run(layers[layer].buyables[data].tooltip, layers[layer].buyables[data])"></tooltip>

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
			<div class="exBuyableHolder tooltipBox" v-bind:style="[{'background-color': tmp[layer].color}, run(layers[layer].buyables[data].style, layers[layer].buyables[data])]">
				<div class="exBuyableBar">
					<div class="exBuyableBarText">
						<span v-html="tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? formatWhole(player[layer].buyables[data]) : formatWhole(player[layer].buyables[data])+'/'+formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					</div>
					<div class="exBuyableBarProgress" v-bind:style="{'width': tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? '100%' : toNumber(player[layer].buyables[data].div(tmp[layer].buyables[data].purchaseLimit).mul(100))+'%',
					'background-color': run(layers[layer].buyables[data].style, layers[layer].buyables[data]).borderColor != undefined ? run(layers[layer].buyables[data].style, layers[layer].buyables[data]).borderColor : run(layers[layer].buyables[data].style, layers[layer].buyables[data]).backgroundColor != undefined ? run(layers[layer].buyables[data].style, layers[layer].buyables[data]).backgroundColor : tmp[layer].color}"></div>
				</div>
				<div class="exBuyableInfo" :id='"buyable-" + layer + "-" + data'>
					<div class="exBuyableInfo2">
						<span v-if= "layers[layer].buyables[data].title"><h2 v-html="run(layers[layer].buyables[data].title, layers[layer].buyables[data])"></h2><br></span>
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
				<tooltip v-if="layers[layer].buyables[data].tooltip" :text="run(layers[layer].buyables[data].tooltip, layers[layer].buyables[data])"></tooltip>
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
			<div class="exBuyableHolder" v-bind:style="[{'background-color': tmp[layer].color}, run(layers[layer].buyables[data].style, layers[layer].buyables[data])]">
				<div class="exBuyableBar">
					<div class="exBuyableBarText">
						<span v-html="tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? formatWhole(player[layer].buyables[data]) : formatWhole(player[layer].buyables[data])+'/'+formatWhole(tmp[layer].buyables[data].purchaseLimit)"></span>
					</div>
					<div class="darkBuyableBarProgress" v-bind:style="{'width': tmp[layer].buyables[data].purchaseLimit.eq(Infinity) ? '100%' : toNumber(player[layer].buyables[data].div(tmp[layer].buyables[data].purchaseLimit).mul(100))+'%',
					'background-color': run(layers[layer].buyables[data].style, layers[layer].buyables[data]).borderColor != undefined ? run(layers[layer].buyables[data].style, layers[layer].buyables[data]).borderColor : run(layers[layer].buyables[data].style, layers[layer].buyables[data]).backgroundColor != undefined ? run(layers[layer].buyables[data].style, layers[layer].buyables[data]).backgroundColor : tmp[layer].color}"></div>
				</div>
				<div class="exBuyableInfo">
					<div class="exBuyableInfo2">
						<span v-if= "layers[layer].buyables[data].title"><h2 v-html="run(layers[layer].buyables[data].title, layers[layer].buyables[data])"></h2><br></span>
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
			v-bind:style="[tmp[layer].buyables[data].canBuy ? {'background-color': tmp[layer].color} : {}, tmp[layer].componentStyles.buyable, run(layers[layer].buyables[data].style, layers[layer].buyables[data])]"
			v-on:click="if(!interval) buyBuyable(layer, data)" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
				<div v-bind:class="{jinxTitle: true}" v-if="layers[layer].buyables[data].title">
					<span v-html="run(layers[layer].buyables[data].title, layers[layer].buyables[data])"></span>
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
				<tooltip v-if="layers[layer].buyables[data].tooltip" :text="run(layers[layer].buyables[data].tooltip, layers[layer].buyables[data])"></tooltip>

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
			<button v-bind:class="{ levelableHolder: true, tooltipBox: true, can: tmp[layer].levelables[data].canClick, locked: !tmp[layer].levelables[data].canClick}"
			v-bind:style="[{'background-color': tmp[layer].color}, run(layers[layer].levelables[data].style, layers[layer].levelables[data])]"
			v-on:click="clickLevelable(layer, data)" :id='"levelable-" + layer + "-" + data'>
				<div class="levelableTop">
					<img v-bind:src="run(layers[layer].levelables[data].image, layers[layer].levelables[data])" class="levelableImg"></img>
					<div v-bind:class="{levelableText: true, hide: player[layer].levelables[data][0].eq(0)&&player[layer].levelables[data][1].eq(0)&&!(player[layer].levelables[data][2].gt(0) && tmp[layer].levelables[data].levelLimit.neq(Infinity))}">
						<span v-html="tmp[layer].levelables[data].levelLimit.eq(Infinity) ? 'Lv ' + formatShortestWhole(player[layer].levelables[data][0]) : 'Lv ' + formatShortestWhole(player[layer].levelables[data][0])+'/'+formatShortestWhole(tmp[layer].levelables[data].levelLimit)"></span>
						<span style='color:#a0b2c6' v-if="tmp[layer].levelables[data].levelLimit.gt(10) && layer == 'pet' && player[layer].levelables[data][2].gt(0)" v-html="'<br>★ ' + formatShortestWhole(player[layer].levelables[data][2])"></span>
					</div>
				</div>
				<div class="levelableBottom">
					<div v-bind:class="{levelableBarText: true, hide: !tmp[layer].levelables[data].barShown}">
						<span v-html="player[layer].levelables[data][0].gte(tmp[layer].levelables[data].levelLimit) ? formatShortestWhole(tmp[layer].levelables[data].currency) : formatShortestWhole(tmp[layer].levelables[data].currency)+'/'+formatShortestWhole(tmp[layer].levelables[data].xpReq)"></span>
					</div>
					<div v-bind:class="{levelableBarProgress: true, hide: !tmp[layer].levelables[data].barShown}" v-bind:style="[{'width': toNumber(tmp[layer].levelables[data].currency.div(tmp[layer].levelables[data].xpReq).mul(100))+'%'}, tmp[layer].levelables[data].barStyle]"></div>
				</div>
				<tooltip v-if="layers[layer].levelables[data].tooltip" :text="run(layers[layer].levelables[data].tooltip, layers[layer].levelables[data])"></tooltip>
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
				<div class="levelableDisplayCard" v-bind:style="{width: run(layers[layer].levelables[layers[layer].levelables.index].style, layers[layer].levelables[layers[layer].levelables.index]).width, height: run(layers[layer].levelables[layers[layer].levelables.index].style, layers[layer].levelables[layers[layer].levelables.index]).height}">
					<div class="levelableDisplayImgHolder">
						<img v-bind:src="run(layers[layer].levelables[layers[layer].levelables.index].image, layers[layer].levelables[layers[layer].levelables.index])" class="levelableImg"></img>
						<div v-bind:class="{levelableText: true, hide: layers[layer].levelables.index==0}">
							<span v-html="tmp[layer].levelables[layers[layer].levelables.index].levelLimit.eq(Infinity) ? 'Lv ' + formatShortestWhole(player[layer].levelables[layers[layer].levelables.index][0]) : 'Lv ' + formatShortestWhole(player[layer].levelables[layers[layer].levelables.index][0])+'/'+formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].levelLimit)"></span>
							<span style='color:#a0b2c6' v-if="tmp[layer].levelables[layers[layer].levelables.index].levelLimit.gt(10) && layer == 'pet' && player[layer].levelables[layers[layer].levelables.index][2].gt(0)" v-html="'<br>★ ' + formatShortestWhole(player[layer].levelables[layers[layer].levelables.index][2])"></span>
						</div>
					</div>
					<div class="levelableDisplayBarHolder">
						<div v-bind:class="{levelableBarText: true, hide: layers[layer].levelables.index==0}">
							<span v-html="player[layer].levelables[layers[layer].levelables.index][0].gte(tmp[layer].levelables[layers[layer].levelables.index].levelLimit) ? formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].currency) : formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].currency)+'/'+formatShortestWhole(tmp[layer].levelables[layers[layer].levelables.index].xpReq)"></span>
						</div>
						<div v-bind:class="{levelableBarProgress: true, hide: layers[layer].levelables.index==0}" v-bind:style="[{'width': toNumber(tmp[layer].levelables[layers[layer].levelables.index].currency.div(tmp[layer].levelables[layers[layer].levelables.index].xpReq).mul(100))+'%'}, tmp[layer].levelables[layers[layer].levelables.index].barStyle]"></div>
					</div>
				</div>
			</div>
			<div class="levelableDisplayCol2">
				<div class="levelableDisplayText">
					<div class="levelableDisplayTitle">
						<span v-html="run(layers[layer].levelables[layers[layer].levelables.index].title, layers[layer].levelables[layers[layer].levelables.index])"></span>
					</div>
					<div class="levelableDisplayButtonHolder" v-bind:class="{hide: (layers[layer].levelables[layers[layer].levelables.index].lore == null)}">
						<button v-bind:class="{levelableDisplayButton: true, levelableDisplayButtonSelect: layers[layer].levelables.toggle, hide: (layers[layer].levelables[layers[layer].levelables.index].lore == null)}"
						v-on:click="(layers[layer].levelables.toggle=true)">Effects</button>
						<button v-bind:class="{levelableDisplayButton: true, levelableDisplayButtonSelect: !layers[layer].levelables.toggle, hide: (layers[layer].levelables[layers[layer].levelables.index].lore == null)}"
						v-on:click="(layers[layer].levelables.toggle=false)">Description</button>
					</div>
					<div v-bind:class="{levelableDisplayDescription: true, hide: (!layers[layer].levelables.toggle && layers[layer].levelables[layers[layer].levelables.index].lore != null)}"  v-bind:style="[(layers[layer].levelables[layers[layer].levelables.index].lore == null) ? {'height': '96px'} : {'height': '79px'}]">
						<span v-html="run(layers[layer].levelables[layers[layer].levelables.index].description, layers[layer].levelables[layers[layer].levelables.index])"></span>
					</div>
					<div v-bind:class="{levelableDisplayLore: true, hide: (layers[layer].levelables.toggle || layers[layer].levelables[layers[layer].levelables.index].lore == null)}">
						<span v-html="run(layers[layer].levelables[layers[layer].levelables.index].lore, layers[layer].levelables[layers[layer].levelables.index])"></span>
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
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, run(layers[layer].clickables[data].style, layers[layer].clickables[data])]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" @touchmove="hover" @mouseenter="hover">
			<span v-if= "layers[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="run(layers[layer].clickables[data].title, layers[layer].clickables[data])" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<tooltip v-if="layers[layer].clickables[data].tooltip" :text="run(layers[layer].clickables[data].tooltip, layers[layer].clickables[data])"></tooltip>

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
					}).bind(this), 50)
				}
				this.hover()
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
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, run(layers[layer].clickables[data].style, layers[layer].clickables[data])]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" @touchmove="hover" @mouseenter="hover">
			<span v-if= "layers[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="run(layers[layer].clickables[data].title, layers[layer].clickables[data])" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<div class='bottomTooltip' v-if="layers[layer].clickables[data].tooltip" v-html="run(layers[layer].clickables[data].tooltip, layers[layer].clickables[data])"></div>

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
					}).bind(this), 50)
				}
				this.hover()
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
			v-bind:style="[tmp[layer].clickables[data].canClick ? {'background-color': tmp[layer].color} : {}, run(layers[layer].clickables[data].style, layers[layer].clickables[data])]"
			v-on:click="if(!interval) clickClickable(layer, data)" :id='"clickable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" @touchmove="hover" @mouseenter="hover">
			<span v-if= "layers[layer].clickables[data].title" v-bind:style="{'transition-duration': '0s'}"><h2 v-html="run(layers[layer].clickables[data].title, layers[layer].clickables[data])" v-bind:style="{'transition-duration': '0s'}"></h2><br></span>
			<span v-bind:style="{'white-space': 'pre-line','transition-duration': '0s'}" v-html="run(layers[layer].clickables[data].display, layers[layer].clickables[data])"></span>
			<node-mark :layer='layer' :data='tmp[layer].clickables[data].marked'></node-mark>
			<tooltip v-if="layers[layer].clickables[data].tooltip" :text="run(layers[layer].clickables[data].tooltip, layers[layer].clickables[data])"></tooltip>

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
					}).bind(this), 50)
				}
				this.hover()
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
		v-on:click="clickGrid(layer, data)" @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop" @touchmove="hover" @mouseenter="hover">
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
				this.hover()
			},
			stop() {
				clearInterval(this.interval)
				this.interval = false
			  	this.time = 0
			},
			hover() {
				hoverGrid(this.layer, this.data)
			},
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

			<column v-else v-bind:style="run(layers[layer].microtabs[data][player.subtabs[layer][data]].style, layers[layer].microtabs[data][player.subtabs[layer][data]])" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
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

			<column v-else v-bind:style="run(layers[layer].microtabs[data][player.subtabs[layer][data]].style, layers[layer].microtabs[data][player.subtabs[layer][data]])" :layer="layer" :data="tmp[layer].microtabs[data][player.subtabs[layer][data]].content"></column>
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
		<div v-if="tmp[layer].bars && tmp[layer].bars[data].unlocked" v-bind:style="{'position': 'relative'}"><div v-bind:style="[run(layers[layer].bars[data].style, layers[layer].bars[data]), style.dims, {'display': 'table'}]">
			<div class = "overlayTextContainer barBorder" v-bind:style="[tmp[layer].bars[data].borderStyle, style.dims]">
				<span class = "overlayText" v-bind:style="[run(layers[layer].bars[data].style, layers[layer].bars[data]), tmp[layer].bars[data].textStyle]" v-html="run(layers[layer].bars[data].display, layers[layer].bars[data])"></span>
			</div>
			<div class ="barBG barBorder" v-bind:style="[run(layers[layer].bars[data].style, layers[layer].bars[data]), tmp[layer].bars[data].baseStyle, tmp[layer].bars[data].borderStyle,  style.dims]">
				<div class ="fill" v-bind:style="[run(layers[layer].bars[data].style, layers[layer].bars[data]), tmp[layer].bars[data].fillStyle, style.fillDims]"></div>
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
			v-bind:style="achievementStyle(layer, data)" style="position:relative" v-on:click="if(run(layers[layer].achievements[data].complete, layers[layer].achievements[data]) && !hasAchievement(layer, data)) completeAchievement(layer, data)">
			<div class='bottomTooltip' style="margin-top:8px" v-html="
				(layers[layer].achievements[data].tooltip == '') ? false : hasAchievement(layer, data) ? (tmp[layer].achievements[data].doneTooltip ? tmp[layer].achievements[data].doneTooltip : (layers[layer].achievements[data].tooltip ? run(layers[layer].achievements[data].tooltip, layers[layer].achievements[data]) : 'You did it!'))
				: (tmp[layer].achievements[data].goalTooltip ? tmp[layer].achievements[data].goalTooltip : (layers[layer].achievements[data].tooltip ? run(layers[layer].achievements[data].tooltip, layers[layer].achievements[data]) : 'LOCKED'))
			"></div>
			<span v-if= "tmp[layer].achievements[data].name" style="width:80px;line-height:0.9;letter-spacing:-1px"><h3 v-bind:style="tmp[layer].achievements[data].textStyle" v-html="tmp[layer].achievements[data].name"></h3></span>
			<div style="position:absolute;bottom:0;right:0;width:20px;height:20px;border-top:3px solid;border-left:3px solid;border-color:inherit;border-top-left-radius:10px;border-bottom-right-radius:7px;font-size:14px;transition-duration:0s"
				v-bind:style="hasAchievement(layer, data) ? {'background': '#77bf5f'} : {'background': '#bf8f8f'}" v-html="hasAchievement(layer, data) ? '✔' : '✖'"></div>
			<div style="position:absolute;bottom:0;left:0;width:20px;height:20px;border-top:3px solid;border-right:3px solid;border-color:inherit;border-top-right-radius:10px;border-bottom-left-radius:7px;font-size:14px;background:#ffbf00;transition-duration:0s"
				v-bind:style="hasAchievement(layer, data) ? {'background': '#cc9800'} : {'background': '#664c00'}" v-if="tmp[layer].achievements[data].marked">★</div>
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

	Vue.component('cookie-building', {
		props: ['layer', 'data'],
		template: `
		<div v-if="tmp[layer].buyables && tmp[layer].buyables[data]!== undefined && tmp[layer].buyables[data].unlocked" style="display: grid">
			<button v-bind:class="{cookieBuilding: true, tooltipBox: true, cookieCan: tmp[layer].buyables[data].canBuy, locked: !tmp[layer].buyables[data].canBuy, bought: player[layer].buyables[data].gte(tmp[layer].buyables[data].purchaseLimit)}"
			v-bind:style="[tmp[layer].buyables[data].canBuy ? {'opacity':'1'} : {'opacity':'0.6'}, tmp[layer].componentStyles.buyable, run(layers[layer].buyables[data].style, layers[layer].buyables[data])]"
			v-on:click="if(!interval) buyBuyable(layer, data)" :id='"buyable-" + layer + "-" + data' @mousedown="start" @mouseleave="stop" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
				<div style="margin:-7px 0 -7px -7px">
					<img v-bind:src="run(layers[layer].buyables[data].img, layers[layer].buyables[data])" width="64px" height="64px"></img>
					<div style="display:inline-block;width:272px;height:64px">
						<span style="position:absolute;top:0;left:57px;font-size:28px;text-shadow:#000 0px 1px 4px;letter-spacing:-1px"
							v-html="getBuyableAmount(layer, data).lte(0) ? run(layers[layer].buyables[data].title, layers[layer].buyables[data]) :
							data > 100 ? run(layers[layer].buyables[data].title, layers[layer].buyables[data]) + '<small style=font-size:13px> (x' + format(buyableEffect(layer, data), 2) + 'cps)</small>' :
							run(layers[layer].buyables[data].title, layers[layer].buyables[data]) + '<small style=font-size:13px> (+' + formatSimple(buyableEffect(layer, data), 1) + 'cps)</small>'"></span>
						<img src='resources/checkback/small_cookie.png' width='13px' height='13px' style='position:absolute;bottom:7px;left:57px'></img>
						<span style="position:absolute;bottom:6px;left:72px;font-size:13px;text-shadow:#000 0 0 4px,#000 0 1px 0" v-bind:style="[tmp[layer].buyables[data].canBuy ? {'color':'#6f6'} : {'color':'#f66'}]" v-html="formatWhole(tmp[layer].buyables[data].cost)"></span>
						<span style="position:absolute;top:1px;right:5px;font-size:40px;opacity:0.2;color:#000" v-html="getBuyableAmount(layer, data).gt(0) ? formatWhole(getBuyableAmount(layer, data)) : ''"></span>
					</div>
				</div>
				<tooltip v-if="layers[layer].buyables[data].tooltip" :text="run(layers[layer].buyables[data].tooltip, layers[layer].buyables[data])"></tooltip>
			</button>
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

	Vue.component('cookie-upgrade', {
		props: ['layer', 'data'],
		template: `
		<button v-if="tmp[layer].upgrades && tmp[layer].upgrades[data]!== undefined && tmp[layer].upgrades[data].unlocked" :id='"upgrade-" + layer + "-" + data' v-on:click="buyUpg(layer, data)"
			v-bind:class="{[layer]: true, tooltipBox: true, cookieUpgrade: true, cookieBought: hasUpgrade(layer, data), locked: (!(canAffordUpgrade(layer, data))&&!hasUpgrade(layer, data)), cookieCan: (canAffordUpgrade(layer, data)&&!hasUpgrade(layer, data))}"
			v-bind:style="[hasUpgrade(layer, data) || canAffordUpgrade(layer, data) ? {'opacity': '1'} : {'opacity': '0.6'}, hasUpgrade(layer, data) ? {'border-image': 'url(resources/checkback/upgBorderBought.png) 24'} : {}, run(layers[layer].upgrades[data].style, layers[layer].upgrades[data])]" @touchmove="hover" @mouseenter="hover">
				<img v-bind:src="run(layers[layer].upgrades[data].img, layers[layer].upgrades[data])" width="40px" height="40px"></img>
				<tooltip v-if="layers[layer].upgrades[data].tooltip" :text="run(layers[layer].upgrades[data].tooltip, layers[layer].upgrades[data])"></tooltip>
			</button>
		`,
		methods: {
			hover() {
				player.ep2.upgIndex = this.data
			},
		},
	})

	Vue.component('cookie-display', {
		props: ['layer', 'data'],
		template: `
			<div class="cookieUpgDisplay">
				<span style="position:absolute;top:4px;left:15px;font-size:20px;text-shadow:#000 0px 1px 4px;letter-spacing:-1px" v-html="player.ep2.upgIndex != 0 ? run(layers.ep2.upgrades[player.ep2.upgIndex].title, layers.ep2.upgrades[player.ep2.upgIndex]) : ''"></span>
				<span v-if="player.ep2.upgIndex != 0" style="position:absolute;top:7px;right:15px;font-size:14px;text-shadow:#000 0 0 4px,#000 0 1px 0">
					<img v-if="!hasUpgrade('ep2', player.ep2.upgIndex)" src='resources/checkback/small_cookie.png' width='13px' height='13px' style='margin:-3px'></img>
					<span v-if="!hasUpgrade('ep2', player.ep2.upgIndex)" v-bind:style="[canAffordUpgrade('ep2', player.ep2.upgIndex) ? {'color':'#6f6'} : {'color':'#f66'}]" v-html="formatWhole(tmp.ep2.upgrades[player.ep2.upgIndex].cost)"></span>
					<span v-if="hasUpgrade('ep2', player.ep2.upgIndex)" v-html="'Owned'"></span>
				</span>
				<div style="position:absolute;top:30px;left:15px;width:335px;height:2px;border:0;background:#888"></div>
				<span style="position:absolute;top:34px;left:15px;font-size:14px;letter-spacing:-1px;text-align:left;padding-right:15px" v-html="player.ep2.upgIndex != 0 ? run(layers.ep2.upgrades[player.ep2.upgIndex].description, layers.ep2.upgrades[player.ep2.upgIndex]) : ''"></span>
			</div>
		`
	})
	Vue.component('glossary', {
		props: ['layer', 'data'],
		template: `
		<div v-bind:class="{hoverable: true, selected: player[layer].glossaryRig == data}" v-if="run(layers[layer].glossary[data].display, layers[layer].glossary[data])" :disabled="player[layer].glossary[data].eq(0)" v-on:click="layers[layer].glossary[data].onClick ? run(layers[layer].glossary[data].onClick, layers[layer].glossary[data]) : ''" v-bind:style="player[layer].glossary[data].eq(0) ? {'filter': 'brightness(50%)'} : {}" @mouseenter="hover" @touchstart="hover" @touchmove="hover">
			<span style="position:absolute;top:4px;font-size:12px;z-index:10;user-select:none" v-html="layers[layer].generateMult(layer,data)"></span>
			<svg width='60pt' height='60pt' viewBox='0 0 60 60' v-bind:style="player[layer].glossary[data].eq(0) ? {'filter': 'brightness(50%) drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))'} : {}" style="filter:drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.5))" v-html="layers[layer].glossary[data].svg"></svg>
		</div>
		`,
		methods: {
			hover() {
				if (player[this.layer].glossary[this.data].gt(0) && layers[this.layer].glossary[this.data].onHover) run(layers[this.layer].glossary[this.data].onHover, layers[this.layer].glossary[this.data])
			},
		},
	})

	Vue.component('glossary-display', {
		props: ['layer', 'data'],
		template: `
			<div class="glossaryUpgDisplay">
				<span style="position:absolute;top:4px;left:15px;font-size:20px;text-shadow:#000 0px 1px 4px;letter-spacing:-1px" v-html="player.fl.glossaryIndex != 0 ? layers.fl.glossary[player.fl.glossaryIndex].name : ''"></span>
				<span style="position:absolute;top:7px;right:15px;font-size:14px;text-shadow:#000 0 0 4px,#000 0 1px 0" v-html="player.fl.glossaryIndex != 0 ? 'You have: ' + formatSimple(player.fl.glossary[player.fl.glossaryIndex], 1) : ''"></span>
				<div style="position:absolute;top:30px;left:15px;width:505px;height:2px;border:0;background:#888"></div>
				<span style="position:absolute;top:34px;left:15px;font-size:14px;letter-spacing:-1px;text-align:left;padding-right:15px" v-html="player.fl.glossaryIndex != 0 ? run(layers.fl.glossary[player.fl.glossaryIndex].getTitle, layers.fl.glossary[player.fl.glossaryIndex]) : ''"></span>
			</div>
		`
	})

	// [TEXT, SUBTAB, TAB, ENABLE]
	Vue.component('category-button', {
		props: ['layer', 'data'],
		template: `
			<button class="shopButton" v-bind:class="{selected: player.subtabs[layer][data[1]] == data[2]}" :disabled="data[3]" v-on:click="player.subtabs[layer][data[1]] = data[2]" v-html="!data[3] ? data[0] : ''" ></button>
		`
	}),

	// [TEXT, UNLOCK, DEFAULT_COLOR, CONDITION, CONDITION_COLOR]
	Vue.component('color-text', {
		props: ['layer', 'data'],
		template: `
			<span class="instant" v-if="data[1]" v-bind:style="data[3] ? {'color': data[2]} : {'color': data[4]}" style="pointer-events:none;user-select:none" v-html="data[0]"></span>
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
