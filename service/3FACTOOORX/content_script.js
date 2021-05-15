console.log("Hello from OOO");

let FLAG="";
let domvalue = "";

// Put all the javascript code here, that you want to execute after page load.
document.addEventListener('DOMContentLoaded', (event) => {
  //the event occurred
  document.body.style.backgroundColor="green"
  domvalue = check_dom();
  console.log("Final DOM value: "+domvalue)
})

function getDepth(node) {
    depth = -1;
    while (node != null) {
      depth++;
      node = node.parentNode;
    }
    return depth;
}

function check_dom() {
  // DOM authentication verification
  var targetNode = document.getElementById("3fa")

  // check1: structure
  // Digest Values for DOM (DOMHASH)
  
  // dom children length
  chilen = targetNode.querySelectorAll("*").length
  // console.log("Children: "+chilen)

  maxdepth = 0;

  // number of total attributes
  total_attributes=targetNode.attributes.length;
  for (let node of targetNode.querySelectorAll("*")) {
    d = getDepth(node);
    if (d > maxdepth) maxdepth = d;
    if(node.attributes) 
      total_attributes+=node.attributes.length
  }
  // console.log("Total attributes: " + total_attributes)

  // maximum depth
  // console.log("Maxdepth: " + maxdepth);
  // some unique ID in the children
  // some unique attribute in one of the children
  specificid = 0;
  if (document.querySelector('[tost="1"]') != null) {
    specificid = 1;
  }
  token = 0;
  if (document.querySelector('#thirdfactooor').tagName == "INPUT") {
    token = 1337;
  }

  // maximum size in chars
  totalchars = targetNode.innerHTML.length

  return chilen+maxdepth+total_attributes+totalchars+specificid+token
}

// *****************************************************************************
// check2: behavior
let nodesadded = 0;
let nodesdeleted = 0;
let attrcharsadded = 0;



const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
      var targetNode = document.getElementById("3fa")
      if (!targetNode) {
        // 3fa not here yet
        return;
      } else { 
        if (mutation.target === targetNode || mutation.target.parentNode === targetNode || mutation.target.parentNode.parentNode === targetNode) {
          // console.log("Relevant mutation!")
        } else {
          return;
        } 
      }
      if (mutation.type === 'childList') {
          // console.log('A child node has been added or removed.');
          nodesadded += mutation.addedNodes.length;
          nodesdeleted += mutation.removedNodes.length;
      }
      else if (mutation.type === 'attributes') {
          // console.log('The ' + mutation.attributeName + ' attribute was modified.');
          attrcharsadded += mutation.attributeName.length;
      }
    }
    // console.log(mutationsList)
    console.log("Nodes added: " + nodesadded)
    console.log("Nodes deleted: " + nodesdeleted)
    console.log("Attribute chars added: " + attrcharsadded)
  };

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// observe the root document, since the DOM is not rendered yet
observer.observe(document, config);
console.log("The observer is observing.")

// summary checks of behavior

// number of attributes inserted
// number of child nodes inserted
// number of attributes deleted
// number of child nodes deleted
// total chars of attribute names inserted
// *****************************************************************************

setTimeout(function(){ 
  chrome.runtime.sendMessage({getflag: "true"}, function(response) {
    FLAG=response.flag;
    console.log("flag: " + response.flag);
    if (
      nodesadded == 5 &&
      nodesdeleted == 3 &&
      attrcharsadded == 23 &&
      domvalue == 2188
    ) {
      document.getElementById("thirdfactooor").value = response.flag
    }
    // notify browser that we're done
    const div = document.createElement("div")
    div.setAttribute("id", "processed")
    document.body.appendChild(div);
  })}, 500);