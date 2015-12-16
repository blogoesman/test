var container, stats;
var camera, scene, renderer, group, particle;
var mouseX = 0, mouseY = 0;
var diam = 400;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

			init();
			animate();

			function init() {
        
        
        
				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
				camera.position.z = 1000;

				scene = new THREE.Scene();
        
           
				var PI2 = Math.PI * 2;
				var program = function ( context ) {

					context.beginPath();
					context.arc( 0, 0, 0.5, 0, PI2, true );
					context.fill();

				};

				group = new THREE.Group();
				scene.add( group );

        for ( var i = 0; i < 50; i++ ) {

					var material = new THREE.SpriteCanvasMaterial( {
						color: 0xFFFFFF,
            opacity: 1,
						program: program
					} );

					particle = new THREE.Sprite( material );
          
          
          var alpha = Math.random() * Math.PI * 2;
          var omega = Math.random() *  Math.PI * 2;
          
          
					particle.position.x = diam * Math.cos(alpha) * Math.cos(omega);
					particle.position.y = diam * Math.cos(alpha) * Math.sin(omega);
					particle.position.z = diam * Math.sin(alpha) ;
					particle.scale.x = particle.scale.y = Math.random() * 10 + 5;
					group.add( particle );
				}
        
        // test particle class 
        
        for ( var i = 0; i <200; i++ ) {

			  var material_particles = new THREE.SpriteCanvasMaterial( {
						color: 0xFFFFFF,
            opacity: 1,
						program: program
					} );
          var alpha = Math.random() * Math.PI * 2;
          var omega = Math.random() *  Math.PI * 2;
                   
					particle.px = diam * Math.cos(alpha) * Math.cos(omega);
					particle.py = diam * Math.cos(alpha) * Math.sin(omega);
					particle.pz = diam * Math.sin(alpha) ;
          
					particle = new THREE.Sprite( material_particles );
					particle.scale.x = particle.scale.y = Math.random() * 10 + 5;
					initParticle( particle, i * 10 );
					group.add( particle );
				}
        
        //renderer

        renderer = new THREE.CanvasRenderer({ alpha: true });
       // renderer.setClearColorHex( 0xffffff, 1 );
        renderer.setClearColorHex( 0x4d5454, 1 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement ); 
        /*
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				container.appendChild( stats.domElement );
        */
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function initParticle( particle, delay ) {

				var particle = this instanceof THREE.Sprite ? this : particle;
				var delay = Math.random()*8000 + 2000;
        var duree = 2000;
				//particle.position.set( 0, 0, 0 );
          var alpha = Math.random() * Math.PI * 2;
          var omega = Math.random() *  Math.PI * 2;     
					particle.position.x = diam * Math.cos(alpha) * Math.cos(omega);
					particle.position.y = diam * Math.cos(alpha) * Math.sin(omega);
					particle.position.z = diam * Math.sin(alpha) ;
          particle.opacity = 1;
        
				new TWEEN.Tween( particle )
					.delay( delay )
					.to( { }, 8000 )
					.onComplete( initParticle )
					.start();
      
				new TWEEN.Tween( particle.position )
					.delay( delay )
					.to( {  x: this.px, y: this.py, z: this.pz }, duree )
					.start();

				new TWEEN.Tween( particle )
					.delay( 100 )
					.to( {  opacity: 0 }, 2000 )
					.start();

				

			}
			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();

					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					mouseY = event.touches[ 0 ].pageY - windowHalfY;

				}

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				TWEEN.update();
				camera.position.x += ( mouseX - camera.position.x ) * 0.015;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.015;
				camera.lookAt( scene.position );
        

				//group.rotation.x += 0.001;
				group.rotation.y += 0.005;
        
				renderer.render( scene, camera );
        
			}
