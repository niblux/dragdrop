function openCat(catName) {
    var i;
    var x = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none"; 
    }
    document.getElementById(catName).style.display = "block"; 
}

document.getElementById("parent-list").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "BUTTON") {
    	var catName = e.target.className;
        openCat(catName);
    }
});

var crTarget;

document.getElementById("tabs").addEventListener("click",function(e) {
    if(e.target && e.target.nodeName == "IMG") {
        var clsName = e.target.className;
        var cat = e.target.dataset.cat;
        var val = e.target.dataset.val;
        var crTarget = e.target;
        crTarget.remove();
        // console.log(crTarget);
        // removeEl(clsName, cat, crTarget);

        result -= parseInt(val); 
        grandTotal.innerHTML = "<br/>In retirement you<br/>will need:<br/><br/> £" + result + "<br/><br/>...a year";  


    // Luxuries
    if (cat === "luxuries") {
      if (totalLx >= 1) {
        totalLx -= parseInt(val); 
        total_lux.innerHTML = "LUXURIES<br/> £" + totalLx;  
        $('#total_lux').css('height', '-=15');
      }
    }

  // Essentials    
  if (cat === "essentials") {
      // Prevent Negative Value
      if (totalEs >= 1) {
        totalEs -= parseInt(val); 
        total_esse.innerHTML = "ESSENTIALS<br/> £" + totalEs; 
        $('#total_esse').css('height', '-=15');
      } 
  }

  // Nice to Have 
    if (cat === "niceTohave") {
      if (totalNi >= 1) {
        totalNi -= parseInt(val); 
        total_nice.innerHTML = "NICE TO HAVE<br/> £" + totalNi;
        $('#total_nice').css('height', '-=15');  
      }
    }
  }
});

// WORKS FINE JUST REMOVES LAST ITEM NOT INDIVIDUAL
  //   function removeEl(clsName, catName, crTarget) {
  //   target = document.getElementById(catName);
  //   lastEl = crTarget;
  //   target.remove(lastEl);
  // }


  var basket = document.getElementById('basket'); 
  var essentialDragItems = document.getElementById('essentials_tab'); 
  var niceDragItems = document.getElementById('niceToHave_tab'); 
  var luxuriesDragItems = document.getElementById('luxuries_tab'); 

  // Global Targets to place items 
  var essen = document.getElementById('essentials');
  var nice = document.getElementById('niceTohave');
  var lux = document.getElementById('luxuries');  

  var grandTotal = document.getElementById('grand_total');  
  var total_nice = document.getElementById('total_nice');  
  var total_lux = document.getElementById('total_lux');  
  var total_esse = document.getElementById('total_esse');  

  var containers = [basket, essentialDragItems, niceDragItems, luxuriesDragItems];

  var el;
  var target;

  var imgSrc;

  function createEl(className, catName, val) {
    target = document.getElementById(catName);
    el = document.createElement('img');
    el.setAttribute('src', 'img/' + className + 'minus.png'); 
    el.setAttribute('class', className);
    el.setAttribute('data-cat', catName);
    el.setAttribute('data-val', val);
    target.appendChild(el);
  }

  var lastEl;
  var targetEL;

  var drake = dragula(containers, {
    isContainer: function (el) {
      return false;
    },
    moves: function (el, source, handle, sibling) {
      return true; // elements are always draggable by default
    },
    accepts: function (el, target, source, sibling) {
      return target.id === "#basket" || $(target).is('#basket');
    }, // elements can be dropped in any of the `containers` by default
  // invalid: function (el, handle) {
  //   return false; // don't prevent any drags from initiating by default
  // },
  // direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
  // copy: false,                       // elements are moved by default, not copied
  // copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
  // mirrorContainer: document.body,    // set the element that gets mirror elements appended
  // ignoreInputTextSelection: true     // allows users to select input text, see details below
});

// var mainContainers = dragula(containers2, {

// });


var totalEs = 0, totalNi = 0, totalLx = 0;
var result = 0;

drake.on('drop', function(event) {
  var cat = event.dataset.cat;
  var val = event.dataset.value;
  var icon = event.dataset.class; // this used to be the font awesome icons class
  var src = event.src;

  event.style.display = 'none';

  result += parseInt(val); 
  grandTotal.innerHTML = "<p>In retirement you<br/>will need<br/><h2> £" + result + "</h2><br/>... a year</p>";  

  if (cat === "essentials") {
    createEl(icon, cat, val);
    totalEs += parseInt(val); 
    total_esse.innerHTML = "ESSENTIALS<br/> £" + totalEs;  
    $('#total_esse').css('height', '+=15');
  } else if (cat === "niceTohave") {
    createEl(icon, cat, val);
    totalNi += parseInt(val); 
    total_nice.innerHTML = "NICE TO HAVE<br/> £" + totalNi;  
    $('#total_nice').css('height', '+=15');
  } else if (cat === "luxuries") {
    createEl(icon, cat, val);
    totalLx += parseInt(val); 
    total_lux.innerHTML = "LUXURIES<br/> £" + totalLx; 
    $('#total_lux').css('height', '+=15');
  }

});
