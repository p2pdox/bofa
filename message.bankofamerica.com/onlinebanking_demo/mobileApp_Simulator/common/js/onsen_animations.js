
// CUSTOM ANIMATOR


// reverseSlide animation
//***********************
var reverseSlide = function(options) {
  options = options || {};

  this.timing = options.timing || 'ease';
  this.duration = options.duration || 0.4;
  this.delay = options.delay || 0;

  var div = document.createElement('div');
  div.innerHTML = '<div style="position: absolute; width: 100%; height: 100%; z-index: 2; background-color: black; opacity: 0;"></div>';
  this.backgroundMask = div.firstChild;
  this.blackMaskOpacity = 0.4;
};

ons.ready(function() {

    reverseSlide.prototype = Object.create(ons.elements.Navigator.NavigatorAnimator.prototype);

    reverseSlide.prototype.push = function(enterPage, leavePage, done) {
      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

      ons.animit.runAll(

        ons.animit(this.backgroundMask)
          .saveStyle()
          .queue({
            opacity: this.blackMaskOpacity,
            transform: 'translate3d(0, 0, 0)'
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()
          .queue(done => {
            this.backgroundMask.remove();
            done();
          }),

        ons.animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(-100%, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        ons.animit(leavePage)
          .saveStyle() //added
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              zIndex: 10000,
              display: 'block'
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(100%, 0px, 0px)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle() //added
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          })
      );
    };

    ons.elements.Navigator.registerAnimator('reverseSlide', reverseSlide);
    ;

});
// END reverseSlide animation
//***********************


// slide animation
// overwrites the default slide animation
//***********************
// var slide = function(options) {
//   options = options || {};
// 
//   this.timing = options.timing || 'ease';
//   this.duration = options.duration || 0.4;
//   this.delay = options.delay || 0;
// 
//   var div = document.createElement('div');
//   div.innerHTML = '<div style="position: absolute; width: 100%; height: 100%; z-index: 2; background-color: black; opacity: 0;"></div>';
//   this.backgroundMask = div.firstChild;
//   this.blackMaskOpacity = 0.4;
// };
// 
// ons.ready(function() {
// 
//     slide.prototype = Object.create(ons.elements.Navigator.NavigatorAnimator.prototype);
// 
//     slide.prototype.push = function(enterPage, leavePage, done) {
//       this.backgroundMask.remove();
//       enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);
// 
//       ons.animit.runAll(
// 
//         ons.animit(this.backgroundMask)
//           .saveStyle()
//           .queue({
//             opacity: this.blackMaskOpacity,
//             transform: 'translate3d(0, 0, 0)'
//           })
//           .wait(this.delay)
//           .queue({
//             opacity: 0
//           }, {
//             duration: this.duration,
//             timing: this.timing
//           })
//           .restoreStyle()
//           .queue(done => {
//             this.backgroundMask.remove();
//             done();
//           }),
// 
//         ons.animit(enterPage)
//           .saveStyle()
//           .queue({
//             css: {
//               transform: 'translate3D(100%, 0px, 0px)',
//               opacity: 0.9
//             },
//             duration: 0
//           })
//           .wait(this.delay)
//           .queue({
//             css: {
//               transform: 'translate3D(0px, 0px, 0px)',
//               opacity: 1.0
//             },
//             duration: this.duration,
//             timing: this.timing
//           })
//           .restoreStyle(),
// 
//         ons.animit(leavePage)
//           .saveStyle() //added
//           .queue({
//             css: {
//               transform: 'translate3D(0px, 0px, 0px)',
//               zIndex: 10000,
//               display: 'block'
//             },
//             duration: 0
//           })
//           .wait(this.delay)
//           .queue({
//             css: {
//               transform: 'translate3D(-100%, 0px, 0px)'
//             },
//             duration: this.duration,
//             timing: this.timing
//           })
//           .restoreStyle() //added
//           .wait(0.2)
//           .queue(function(finish) {
//             done();
//             finish();
//           })
//       );
//     };
// 
//     ons.elements.Navigator.registerAnimator('slide', slide);
//     ;
// 
// });
// END slide animation
//***********************

// pop animation
//***********************
var pop = function(options) {
  options = options || {};

  this.timing = options.timing || 'ease';
  this.duration = options.duration || 0.4;
  this.delay = options.delay || 0;

  var div = document.createElement('div');
  div.innerHTML = '<div style="position: absolute; width: 100%; height: 100%; z-index: 2; background-color: black; opacity: 0;"></div>';
  this.backgroundMask = div.firstChild;
  this.blackMaskOpacity = 0.4;
};

ons.ready(function() {

    pop.prototype = Object.create(ons.elements.Navigator.NavigatorAnimator.prototype);

    pop.prototype.push = function(enterPage, leavePage, done) {
      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

      ons.animit.runAll(

        ons.animit(this.backgroundMask)
          .saveStyle()
          .queue({
            opacity: this.blackMaskOpacity,
            transform: 'scale(1)'
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()
          .queue(done => {
            this.backgroundMask.remove();
            done();
          }),

        ons.animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'scale(1.2)',
              opacity: 0.8
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'scale(1)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        ons.animit(leavePage)
          .saveStyle() //added
          .queue({
            css: {
              transform: 'scale(1)',
              zIndex: 0,
              display: 'block'
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'scale(1)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle() //added
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          })
      );
    };

    ons.elements.Navigator.registerAnimator('pop', pop);
    ;

});
// END pop animation
//***********************

// slideDown animation
//***********************
var slideDown = function(options) {
  options = options || {};

  this.timing = options.timing || 'ease';
  this.duration = options.duration || 0.4;
  this.delay = options.delay || 0;

  var div = document.createElement('div');
  div.innerHTML = '<div style="position: absolute; width: 100%; height: 100%; z-index: 2; background-color: black; opacity: 0;"></div>';
  this.backgroundMask = div.firstChild;
  this.blackMaskOpacity = 0.4;
};

ons.ready(function() {

    slideDown.prototype = Object.create(ons.elements.Navigator.NavigatorAnimator.prototype);

    slideDown.prototype.push = function(enterPage, leavePage, done) {
      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

      ons.animit.runAll(

        ons.animit(this.backgroundMask)
          .saveStyle()
          .queue({
            opacity: this.blackMaskOpacity,
            transform: 'translate3d(0, 0, 0)'
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()
          .queue(done => {
            this.backgroundMask.remove();
            done();
          }),

        ons.animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        ons.animit(leavePage)
          .saveStyle() //added
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              zIndex: 10000,
              display: 'block'

            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 100%, 0px)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle() //added
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          })
      );
    };

    ons.elements.Navigator.registerAnimator('slideDown', slideDown);
    ;

});
// END slideDown animation
//***********************

// lift animation
//***********************
/*
var lift = function(options) {
  options = options || {};

  this.timing = options.timing || 'ease';
  this.duration = options.duration || 0.4;
  this.delay = options.delay || 0;

  var div = document.createElement('div');
  div.innerHTML = '<div style="position: absolute; width: 100%; height: 100%; z-index: 2; background-color: black; opacity: 0;"></div>';
  this.backgroundMask = div.firstChild;
  this.blackMaskOpacity = 0.4;
};

ons.ready(function() {

    lift.prototype = Object.create(ons.elements.Navigator.NavigatorAnimator.prototype);

    lift.prototype.push = function(enterPage, leavePage, done) {
		console.log("overriding lift");
      this.backgroundMask.remove();
      enterPage.parentNode.insertBefore(this.backgroundMask, enterPage.nextSibling);

      ons.animit.runAll(

        ons.animit(this.backgroundMask)
          .saveStyle()
          .queue({
            opacity: this.blackMaskOpacity,
            transform: 'translate3d(0, 0, 0)'
          })
          .wait(this.delay)
          .queue({
            opacity: 0
          }, {
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle()
          .queue(done => {
            this.backgroundMask.remove();
            done();
          }),

        ons.animit(enterPage)
          .saveStyle()
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 0.9
            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              opacity: 1.0
            },
            duration: this.duration,
            timing: this.timing
          })
          .restoreStyle(),

        ons.animit(leavePage)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)',
              zIndex: 10000,
              display: 'block'

            },
            duration: 0
          })
          .wait(this.delay)
          .queue({
            css: {
              transform: 'translate3D(0px, 0px, 0px)'
            },
            duration: this.duration,
            timing: this.timing
          })
          .wait(0.2)
          .queue(function(finish) {
            done();
            finish();
          })
      );
    };

    ons.elements.Navigator.registerAnimator('lift', lift);
    ;

});
*/
// END lift animation
//***********************

