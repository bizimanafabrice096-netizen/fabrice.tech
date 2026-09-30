let progress = Number(localStorage.getItem("netlearnProgress") || 0);

function toggleMenu(){document.getElementById("navLinks").classList.toggle("show")}
function startCourse(name){
  alert("Great! You selected: " + name + "\n\nThe lesson area below is ready for your study content.");
  document.getElementById("lesson").scrollIntoView({behavior:"smooth"});
}
function filterCourses(){
  const q=document.getElementById("courseSearch").value.toLowerCase();
  document.querySelectorAll(".course-card").forEach(card=>{
    card.style.display=card.dataset.search.includes(q)?"block":"none";
  });
}
function markProgress(){
  progress=Math.min(100,progress+20);
  saveProgress();
  alert("Lesson completed! Your progress is now " + progress + "%.");
}
function saveProgress(){
  localStorage.setItem("netlearnProgress",progress);
  document.getElementById("progressFill").style.width=progress+"%";
  document.getElementById("progressText").textContent=progress+"% completed";
}
function resetProgress(){progress=0;saveProgress()}
function checkQuiz(){
  let score=0;
  ["q1","q2","q3"].forEach(q=>{
    const selected=document.querySelector('input[name="'+q+'"]:checked');
    if(selected) score+=Number(selected.value);
  });
  document.getElementById("quizResult").textContent="You scored "+score+"/3.";
  if(score===3){progress=Math.min(100,progress+20);saveProgress();}
}
function addIdea(e){
  e.preventDefault();
  const name=document.getElementById("ideaName").value;
  const title=document.getElementById("ideaTitle").value;
  const text=document.getElementById("ideaText").value;
  const card=document.createElement("article");
  card.className="idea-card";
  card.innerHTML="<h3>"+escapeHTML(title)+"</h3><small>Posted by "+escapeHTML(name)+"</small><p>"+escapeHTML(text)+"</p>";
  document.getElementById("ideasList").prepend(card);
  e.target.reset();
}
function postDiscussion(){
  const input=document.getElementById("discussionAnswer");
  if(!input.value.trim()) return;
  const div=document.createElement("div");
  div.className="post";
  div.textContent=input.value;
  document.getElementById("discussionPosts").prepend(div);
  input.value="";
}
function escapeHTML(str){
  return str.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}
function openLogin(){document.getElementById("loginModal").style.display="flex"}
function closeLogin(){document.getElementById("loginModal").style.display="none"}
function login(){
  const name=document.getElementById("loginName").value.trim();
  document.getElementById("loginMessage").textContent=name ? "Welcome, "+name+"! This demo login is ready for a backend." : "Please enter your username.";
}
window.onclick=e=>{if(e.target===document.getElementById("loginModal"))closeLogin()}
saveProgress();
