  // Global Targets to place items 
  var basket = document.getElementById('basket'); 
  var essentialDragItems = document.getElementById('essentials_tab'); 
  var niceDragItems = document.getElementById('niceToHave_tab'); 
  var luxuriesDragItems = document.getElementById('luxuries_tab'); 

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
  var lastEl;
  var targetEL;
  var imgSrc;


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
        var className = e.target.className;
        console.log(className);
        var cat = e.target.dataset.cat;
        var catId = e.target.dataset.id;
        var val = e.target.dataset.val;
        var crTarget = e.target;
        crTarget.remove();

        sendBackEl(className, cat, val, catId);
        result -= parseInt(val); 
        grandTotal.innerHTML = "Grand Total : £" + result;  


    // Luxuries
    if (cat === "luxuries") {
      if (totalLx >= 1) {
        totalLx -= parseInt(val); 
        total_lux.innerHTML = "Total Luxuries : £" + totalLx; 
        $('#total_lux').css('height', '-=20');
      }
    }

  // Essentials    
  if (cat === "essentials") {
      // Prevent Negative Value
      if (totalEs >= 1) {
        totalEs -= parseInt(val); 
        total_esse.innerHTML = "Total Essentials : £" + totalEs; 
        $('#total_esse').css('height', '-=20');
      } 
  }

  // Nice to Have 
    if (cat === "niceTohave") {
      if (totalNi >= 1) {
        totalNi -= parseInt(val); 
        total_nice.innerHTML = "Total Nice to Have : £" + totalNi;  
        $('#total_nice').css('height', '-=20'); 
      }
    }
  }
});

  function createEl(className, catName, val, id) {
    target = document.getElementById(catName);
    el = document.createElement('img');
    el.setAttribute('src', 'img/' + className + 'minus.png'); 
    el.setAttribute('class', className);
    el.setAttribute('data-cat', catName);
    el.setAttribute('data-val', val);
    el.setAttribute('data-id', id);
    // console.log(className);
    target.appendChild(el);
  }

  function sendBackEl(className, catName, val, id) {
    targetRepeat = document.getElementById(id);
    el = document.createElement('img');
    el.setAttribute('src', 'img/' + className + '.png'); 
    el.setAttribute('class', className);
    el.setAttribute('data-cat', catName);
    el.setAttribute('data-val', val);
    el.setAttribute('data-id', id);
    // console.log(className);
    targetRepeat.appendChild(el);
  }

  var drake = dragula(containers, {
    isContainer: function (el) {
      return false;
    },
    moves: function (el, source, handle, sibling) {
      return true; 
    },
    accepts: function (el, target, source, sibling) {
      return target.id === "#basket" || $(target).is('#basket');
    }, 
    revertOnSpill: true,            
    removeOnSpill: false,             
  });


  var totalEs = 0, totalNi = 0, totalLx = 0;
  var result = 0;

  drake.on('drop', function(event) {
    var cat = event.dataset.cat;
    var val = event.dataset.value;
    console.log(val);
    var icon = event.dataset.class; 
    var catID = event.dataset.id;

    var esseHeight = $('#total_esse').height();
    var luxHeight = $('#total_lux').height();
    var niceHeight = $('#total_nice').height();

  event.style.display = 'none';

  result += parseInt(val); 
  grandTotal.innerHTML = "<p>Grand Total : £" + result + "</p>";  

  if (cat === "essentials") {
    createEl(icon, cat, val, catID);
    totalEs += parseInt(val); 
    total_esse.innerHTML = "Total Essentials : £" + totalEs; 
    $('#total_esse').css('height', '+=20');
  } else if (cat === "niceTohave") {
    createEl(icon, cat, val, catID);
    totalNi += parseInt(val); 
    total_nice.innerHTML = "Total Nice To Have : £" + totalNi;  
    $('#total_nice').css('height', '+=20');
  } else if (cat === "luxuries") {
    createEl(icon, cat, val, catID);
    totalLx += parseInt(val); 
    total_lux.innerHTML = "Total Luxuries : £" + totalLx; 
    $('#total_lux').css('height', '+=20');
  }

});

