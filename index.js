let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn=document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");
const leadsFroomLocalStorage=JSON.parse(localStorage.getItem("leads"));
if(leadsFroomLocalStorage){
    myLeads=leadsFroomLocalStorage;
    renderLeads(myLeads);
}
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("leads",JSON.stringify(myLeads));
    renderLeads(myLeads);
});
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("leads", JSON.stringify(myLeads) );
        renderLeads(myLeads);
    })
});
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    ulEl.textContent="";
});
function renderLeads(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems;  
}
