gsap.registerPlugin(Draggable);

const kmm = {
	
	svg: document.querySelector("#svg"),
	proxy: document.createElement("div"),
	mapContainer: document.getElementById("map-container"),
	viewport: document.querySelector("#viewport"),
	golinks: document.querySelectorAll('.goto'),
	mapSections: document.getElementsByClassName('section'),
	
	reachedThreshold: false,
	point: null,
	startClient: null,
	startGlobal: null,
	viewBox: null,
	dragStart: null,
	
	speed: {},
	data: {},
	vb: {
		"welcome": {b: '0 0 1093 1095', w: '90vw', h: '90vh'}, // stet
		"rand": {b: '0 120 500 400', w: '90vw', h: '90vh'}, // stet
		"guidewire": {b: '300 100 410 350', w: '90vw', h: '90vh'}, // formerly medtech
		"lasers": {b: '500 100 450 300', w: '90vw', h: '90vh'}, // new section
		"hybridgrinding": {b: '470 200 540 300', w: '90vw', h: '90vh'}, // new section - formerly part of dedtru
		"infeed": {b: '650 300 250 250', w: '100vw', h: '100vh'}, // existing section, but with updated machine grouping
		"cncodid": {b: '350 250 350 350', w: '90vw', h: '90vh'}, // new section featuring machines formerly part of infeed
		"shipping": {b: '150 425 450 450', w: '90vw', h: '90vh'}, // stet
		"qualitymedclean": {b: '400 400 250 250', w: '100vw', h: '100vh'}, // re-organized work area + clean room
		"bargrinding": {b: '580 400 250 250', w: '90vw', h: '90vh'}, // parts of re-organized edm
		"cncthrufeed": {b: '700 300 350 350', w: '90vw', h: '90vh'}, // re-organized, truncated thrufeed
		"qualityaerospace": {b: '400 550 350 350', w: '100vw', h: '100vh'}, // reorganized quality, finishing and assembly
		"edm": {b: '500 500 400 400', w: '90vw', h: '90vh'}, // reorganized, truncated edm
		"cncswiss": {b: '650 450 450 450', w: '90vw', h: '90vh'}, // re-organized portion of turning
		"hmc": {b: '450 625 450 450', w: '90vw', h: '90vh'}, // stet
		"vmc": {b: '280 625 450 450', w: '90vw', h: '90vh'}, // formerly milling
		"millturn": {b: '500 650 400 400', w: '90vw', h: '90vh'}, // formerly a small portion of turning
	},
	zoom: {
		animation: gsap.timeline(),
		scaleFactor: 1.1,
		duration: 0.25,
		ease: "power1.easeIn"
	},
	resetAnimation: gsap.timeline()
};

kmm.point = kmm.svg.createSVGPoint();
kmm.startClient = kmm.svg.createSVGPoint();
kmm.startGlobal = kmm.svg.createSVGPoint();
kmm.viewBox = kmm.svg.viewBox.baseVal;

kmm.cachedViewBox = {
	x: kmm.viewBox.x,
	y: kmm.viewBox.y,
	width: kmm.viewBox.width,
	height: kmm.viewBox.height
};

/**
 * Handles the wheel control on the map
 * @param event
 */
kmm.zoomMap = (event) => {
	// event.preventDefault();
	if (!!document.querySelector("#svg:hover")) {
		let normalized;
		let delta = event.wheelDelta;
		
		if (delta) {
			normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
		} else {
			delta = event.deltaY || event.detail || 0;
			normalized = -(delta % 3 ? delta * 10 : delta / 3);
		}
		
		let scaleDelta = normalized > 0 ? 1 / kmm.zoom.scaleFactor : kmm.zoom.scaleFactor;
		kmm.point.x = event.clientX;
		kmm.point.y = event.clientY;
		let startPoint = kmm.point.matrixTransform(kmm.svg.getScreenCTM().inverse());
		
		let fromVars = {
			// ease: kmm.zoom.ease,
			x: kmm.viewBox.x,
			y: kmm.viewBox.y,
			width: kmm.viewBox.width,
			height: kmm.viewBox.height
		};
		
		kmm.viewBox.x -= (startPoint.x - kmm.viewBox.x) * (scaleDelta - 1);
		kmm.viewBox.y -= (startPoint.y - kmm.viewBox.y) * (scaleDelta - 1);
		kmm.viewBox.width *= scaleDelta;
		kmm.viewBox.height *= scaleDelta;
		
		kmm.zoom.animation = gsap.from(kmm.viewBox, kmm.zoom.duration, fromVars);
	}
}
window.addEventListener("wheel", kmm.zoomMap);

kmm.triggerViewboxPress = function (event) {
	if (kmm.resetAnimation.isActive()) {
		kmm.resetAnimation.kill();
	}
	
	kmm.startClient.x = this.pointerX;
	kmm.startClient.y = this.pointerY;
	
	kmm.startGlobal = kmm.startClient.matrixTransform(kmm.svg.getScreenCTM().inverse());
	
	// sets the svg viewbox based on the current zoom level
	gsap.set(kmm.proxy, {
		x: this.pointerX,
		y: this.pointerY
	});
	
	kmm.pannable[0].update().startDrag(event);
	
}

/**
 * Updates the SVG based on the mouse drag
 */
kmm.actionUpdateViewBox = function () {
	if (kmm.zoom.animation.isActive()) {
		return;
	}
	kmm.point.x = this.x;
	kmm.point.y = this.y;
	
	let moveGlobal = kmm.point.matrixTransform(kmm.svg.getScreenCTM().inverse());
	
	kmm.viewBox.x -= (moveGlobal.x - kmm.startGlobal.x);
	kmm.viewBox.y -= (moveGlobal.y - kmm.startGlobal.y);
	
}

/**
 * Zooms to the map section
 */
kmm.actionGoToMapAndContent = function () {
	kmm.ignoreContentScroll = true;
	let name = this.dataset.section;
	kmm.actionGoToMapSection(name);
	console.log(name);
	document.body.className = name;
};

/**
 * Zooms to the map section
 * Uses gsap
 * @param id
 */
kmm.actionGoToMapSection = function (name) {
	
	if (!kmm.pannable) {
		return;
	}
	if (kmm.pannable[0].tween) {
		kmm.pannable[0].tween.kill();
	}
	
	gsap.timeline({delay: 0}).to(kmm.svg, {
		attr: {
			viewBox: kmm.vb[name].b,
			width: kmm.vb[name].w,
			height: kmm.vb[name].h
		},
		duration: 1
	}, "+=.25");
}


/**
 * Set a single click event to call function 'goTo'
 */
kmm.golinks.forEach((goLink) => {
	goLink.addEventListener('click', kmm.actionGoToMapAndContent, true);
});

/**
 * Set a double click event to call function 'goTo'
 */
for (let mapSection of kmm.mapSections) {
	mapSection.addEventListener('dblclick', kmm.actionGoToMapAndContent, true);
}

kmm.pannable = Draggable.create(kmm.proxy, {
	throwResistance: 3000,
	// allowContextMenu: false,
	// allowEventDefault: true,
	trigger: kmm.svg,
	throwProps: true,
	onPress: kmm.triggerViewboxPress,
	onDrag: kmm.actionUpdateViewBox,
	onThrowUpdate: kmm.actionUpdateViewBox,
	onDragEnd: function () {
		if ((Math.abs(this.pointerX - kmm.startClient.x) <= 3) && (Math.abs(this.pointerY - kmm.startClient.y) <= 3)) {
			// kmm.svgOnClick(event);
		}
	}
});

kmm.actionGoToMapSection('welcome');
