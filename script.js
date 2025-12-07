// ================= NAVIGATION LOGIC =================
function enterApp(section) {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('app-container').classList.add('active');
    
    // Hide all sections first
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    
    // Show specific section
    const targetId = section === 'book' ? 'book-section' : 'browser-section';
    document.getElementById(targetId).classList.add('active');
}

function goHome() {
    document.getElementById('app-container').classList.remove('active');
    document.getElementById('landing-page').style.display = 'flex';
}


// ================= PART 1: BOOK STACK LOGIC =================
let bookStack = [];
const bookBaseColors = ['#dc2626', '#ea580c', '#d97706', '#65a30d', '#059669', '#0891b2', '#2563eb', '#7c3aed', '#c026d3', '#db2777'];

function updateBookUI() {
    const shelf = document.getElementById('bookShelf');
    const status = document.getElementById('bookStatus');
    const badge = document.getElementById('bookCountBadge');
    
    shelf.innerHTML = "";
    
    bookStack.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book-item';
        div.innerText = book.title;
        div.style.background = `linear-gradient(to right, ${book.colorDark}, ${book.colorLight} 20%, ${book.colorLight} 90%, ${book.colorDark})`;
        shelf.appendChild(div);
    });

    badge.innerText = `${bookStack.length}/10 Books`;
    
    if(bookStack.length === 0) status.innerText = "Shelf is Empty";
    else status.innerText = `Top Book: "${bookStack[bookStack.length-1].title}"`;
}

function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

function pushBook() {
    const input = document.getElementById('bookInput');
    const title = input.value.trim();
    if(!title) return;
    if(bookStack.length >= 10) { 
        alert("Shelf is full!"); 
        logBook("Error: Stack Overflow (Shelf Full)");
        return; 
    }

    const baseColor = bookBaseColors[Math.floor(Math.random() * bookBaseColors.length)];
    bookStack.push({ 
        title: title, 
        colorLight: baseColor, 
        colorDark: adjustColor(baseColor, -40) 
    });
    
    logBook(`Pushed: "${title}"`);
    input.value = "";
    updateBookUI();
}

function popBook() {
    if(bookStack.length === 0) { 
        alert("Shelf is empty!"); 
        logBook("Error: Stack Underflow");
        return; 
    }
    const removed = bookStack.pop();
    logBook(`Popped: "${removed.title}"`);
    updateBookUI();
}

function peekBook() {
    if(bookStack.length === 0) { alert("Shelf is empty!"); return; }
    const books = document.querySelectorAll('.book-item');
    const topBook = books[books.length-1];
    topBook.classList.add('highlight-book');
    logBook(`Peeked at: "${bookStack[bookStack.length-1].title}"`);
    setTimeout(() => topBook.classList.remove('highlight-book'), 1000);
}

function clearBooks() {
    bookStack = [];
    logBook("Cleared Shelf");
    updateBookUI();
}

// LOGGING
function logBook(msg) {
    const list = document.getElementById('bookLogList');
    const li = document.createElement('li');
    li.innerHTML = `<span class="log-time">${new Date().toLocaleTimeString()}</span> <span>${msg}</span>`;
    list.prepend(li);
}
function toggleBookLog() {
    const c = document.getElementById('bookLogContainer');
    c.classList.toggle('hidden');
    document.getElementById('bookLogIcon').innerText = c.classList.contains('hidden') ? '▶' : '▼';
}

document.getElementById('bookInput').addEventListener("keypress", (e) => { if(e.key==="Enter") pushBook(); });


// ================= PART 2: BROWSER HISTORY LOGIC =================
let currentSite = { name: "Home Page", url: "browser://home", icon: "🏠" };
let backStk = [];
let fwdStk = [];

function getSiteData(input) {
    input = input.toLowerCase().trim();
     if(input.includes("google")) return { name: "Google Search", url: "www.google.com", icon: "🔍" };
    if(input.includes("youtube")) return { name: "YouTube", url: "www.youtube.com", icon: "📺" };
    if(input.includes("github")) return { name: "GitHub", url: "github.com", icon: "🐙" };
    if(input.includes("stackoverflow")) return { name: "Stack Overflow", url: "stackoverflow.com", icon: "📚" };
    const capName = input.charAt(0).toUpperCase() + input.slice(1);
    return { name: `${capName} Website`, url: `www.${input}.com`, icon: "🌐" };
}

function updateBrowserUI() {
    document.getElementById('urlInput').value = currentSite.url;
    
    document.getElementById('viewportContent').innerHTML = `
        <div class="page-placeholder">
            <div class="page-icon">${currentSite.icon}</div>
            <h1 class="page-title">${currentSite.name}</h1>
            <p class="page-url">Loaded: ${currentSite.url}</p>
        </div>
    `;

    renderHistory('backList', backStk, 'border-back');
    renderHistory('fwdList', fwdStk, 'border-fwd');

    document.getElementById('btnBack').disabled = (backStk.length === 0);
    document.getElementById('btnFwd').disabled = (fwdStk.length === 0);
    
    document.getElementById('countBack').innerText = `${backStk.length} Pages`;
    document.getElementById('countFwd').innerText = `${fwdStk.length} Pages`;
}

function renderHistory(id, stack, borderClass) {
    const container = document.getElementById(id);
    container.innerHTML = "";
    if(stack.length === 0) {
        container.innerHTML = '<div class="empty-history">Empty</div>'; return;
    }
    stack.forEach(site => {
        container.innerHTML += `
            <div class="history-item ${borderClass}">
                <div class="item-icon">${site.icon}</div>
                <div class="item-info">
                    <div class="item-title">${site.name}</div>
                    <div class="item-url">${site.url}</div>
                </div>
            </div>
        `;
    });
}

function loadAnim() {
     const bar = document.getElementById('browserLoader');
     bar.style.width = "80%"; setTimeout(() => { bar.style.width = "100%"; }, 200); setTimeout(() => { bar.style.width = "0%"; }, 500);
}

function visitPage() {
    const val = document.getElementById('urlInput').value;
    if(!val) return;
    const newSite = getSiteData(val);
    if(newSite.url === currentSite.url) return;

    backStk.push(currentSite);
    fwdStk = []; // Clear forward
    currentSite = newSite;
    logBrowser(`Visited: ${newSite.url}`);
    loadAnim(); updateBrowserUI();
}

function goBack() {
    if(backStk.length === 0) return;
    fwdStk.push(currentSite);
    currentSite = backStk.pop();
    logBrowser("Action: Go Back");
    loadAnim(); updateBrowserUI();
}

function goFwd() {
    if(fwdStk.length === 0) return;
    backStk.push(currentSite);
    currentSite = fwdStk.pop();
    logBrowser("Action: Go Forward");
    loadAnim(); updateBrowserUI();
}
function reload() { loadAnim(); logBrowser("Action: Reload"); }

// LOGGING
function logBrowser(msg) {
    const list = document.getElementById('browserLogList');
    const li = document.createElement('li');
    li.innerHTML = `<span class="log-time">${new Date().toLocaleTimeString()}</span> <span>${msg}</span>`;
    list.prepend(li);
}
function toggleBrowserLog() {
    const c = document.getElementById('browserLogContainer');
    c.classList.toggle('hidden');
    document.getElementById('browserLogIcon').innerText = c.classList.contains('hidden') ? '▶' : '▼';
}

document.getElementById('urlInput').addEventListener("keypress", (e) => { if(e.key==="Enter") visitPage(); });

// Initialize
updateBookUI();
updateBrowserUI();