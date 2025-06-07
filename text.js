const saveBtn = document.createElement('button');
saveBtn.id = 'save';
saveBtn.textContent = 'Save to Server';
saveBtn.contentEditable = "false";
// Removed all saveBtn.style assignments
styleToolbarButton(saveBtn);

// Create the color picker
const colorInput = document.createElement('input');
colorInput.id = 'color-picker';
colorInput.type = 'color';
colorInput.contentEditable = "false";
// Removed all colorInput.style assignments
styleToolbarButton(colorInput);

// --- Toolbar for text styling ---
const toolbar = document.createElement('div');
toolbar.id = 'toolbar-container';
toolbar.classList.add('textjs-toolbar');
// Removed all toolbar.style assignments

Array.from(toolbar.children).forEach(child => {
    child.style.userSelect = 'none';
});

const toolbarDragHandle = document.createElement('div');
toolbarDragHandle.id = 'toolbar-drag-button';
toolbarDragHandle.title = 'Drag toolbar';
toolbarDragHandle.innerHTML = 'â ¿';
toolbar.appendChild(toolbarDragHandle);
// Removed all toolbarDragHandle.style assignments
styleToolbarButton(toolbarDragHandle);

// Restore button (replaces undo)
const restoreBtn = document.createElement('button');
restoreBtn.id = 'toolbar-restore-button';
restoreBtn.textContent = 'ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã‚Â¸Ãƒâ€šÃ‚Â³';
restoreBtn.title = 'Restore original';
restoreBtn.contentEditable = "false";
// Removed all restoreBtn.style assignments
styleToolbarButton(restoreBtn);

function styleToolbarButton(btn) {
  // Only keep logic, remove all style assignments
  btn.contentEditable = "false";
  btn.style.userSelect = 'none';
  // Keep hover logic if you want, or remove if using CSS only
}

// Bold button
const boldBtn = document.createElement('button');
boldBtn.id = 'toolbar-bold-button';
boldBtn.textContent = 'Bold';
boldBtn.title = 'Bold';
boldBtn.contentEditable = "false";
// Removed all boldBtn.style assignments
styleToolbarButton(boldBtn);

// Italic button
const italicBtn = document.createElement('button');
italicBtn.id = 'toolbar-italic-button';
italicBtn.textContent = 'Italic';
italicBtn.title = 'Italic';
italicBtn.contentEditable = "false";
// Removed all italicBtn.style assignments
styleToolbarButton(italicBtn);

// Underline button
const underlineBtn = document.createElement('button');
underlineBtn.id = 'toolbar-underline-button';
underlineBtn.textContent = 'Underline';
underlineBtn.title = 'Underline';
underlineBtn.contentEditable = "false";
// Removed all underlineBtn.style assignments
styleToolbarButton(underlineBtn);

// Margin input
const marginInput = document.createElement('input');
marginInput.id = 'toolbar-margin-button';
marginInput.type = 'number';
marginInput.min = '0';
marginInput.max = '200';
marginInput.value = '0';
marginInput.title = 'Margin (px)';
marginInput.placeholder = 'Margin';
marginInput.contentEditable = "false";
// Removed all marginInput.style assignments
styleToolbarButton(marginInput);

// Padding input
const paddingInput = document.createElement('input');
paddingInput.id = 'toolbar-padding-button';
paddingInput.type = 'number';
paddingInput.min = '0';
paddingInput.max = '200';
paddingInput.value = '0';
paddingInput.title = 'Padding (px)';
paddingInput.placeholder = 'Padding';
paddingInput.contentEditable = "false";
// Removed all paddingInput.style assignments
styleToolbarButton(paddingInput);

// Close button
const closeBtn = document.createElement('button');
closeBtn.id = 'toolbar-close-button';
closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" style="vertical-align:middle;"><path d="M6 6l8 8M6 14L14 6" stroke="#6b7280" stroke-width="2" stroke-linecap="round"/></svg>';
closeBtn.title = 'Close toolbar';
closeBtn.contentEditable = "false";
// Removed all closeBtn.style assignments
styleToolbarButton(closeBtn);

// Add controls to toolbar (only once each)
colorInput.addEventListener('mousedown', saveSelection);
boldBtn.addEventListener('mousedown', saveSelection);
italicBtn.addEventListener('mousedown', saveSelection);
underlineBtn.addEventListener('mousedown', saveSelection);
marginInput.addEventListener('mousedown', saveSelection);
paddingInput.addEventListener('mousedown', saveSelection);

toolbar.appendChild(marginInput);
toolbar.appendChild(paddingInput);
toolbar.appendChild(boldBtn);
toolbar.appendChild(italicBtn);
toolbar.appendChild(underlineBtn);
toolbar.appendChild(colorInput);
toolbar.appendChild(restoreBtn); // Use restore button instead of undo
toolbar.appendChild(closeBtn);

document.body.appendChild(toolbar);

const poweredLabel = document.createElement('div');
poweredLabel.id = 'toolbar-powered-label';
poweredLabel.innerHTML = 'Powered by <a href="https://textjs.tech" target="_blank" rel="noopener" style="color:blueviolet;text-decoration:underline;pointer-events:auto;text-decoration: none !important;">textjs</a>';
toolbar.appendChild(poweredLabel);

// --- Draggable menu button and menu ---
const menuBtn = document.createElement('button');
menuBtn.title = 'Menu';
// Set initial position with left/top for easier drag logic
menuBtn.style.position = 'fixed';
menuBtn.style.left = 'unset';
menuBtn.style.top = 'unset';
menuBtn.style.bottom = '80px';
menuBtn.style.right = '20px';
menuBtn.style.zIndex = '2000';
menuBtn.style.width = '40px';
menuBtn.style.height = '40px';
menuBtn.style.borderRadius = '50%';
menuBtn.style.background = '#101010';
menuBtn.style.color = '#fff';
menuBtn.style.border = 'none';
menuBtn.style.cursor = 'move';
menuBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
menuBtn.style.display = 'flex';
menuBtn.style.alignItems = 'center';
menuBtn.style.justifyContent = 'center';
menuBtn.style.fontSize = '22px';
menuBtn.style.display = 'none'; //HIDDEN FOR NOW
menuBtn.style.userSelect = 'none';
menuBtn.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`;

document.body.appendChild(menuBtn);


const menuContainer = document.createElement('div');
menuContainer.style.position = 'fixed';
menuContainer.style.bottom = '130px';
menuContainer.style.right = '20px';
menuContainer.style.zIndex = '2001';
menuContainer.style.background = '#fff';
menuContainer.style.border = '1px solid #ccc';
menuContainer.style.borderRadius = '8px';
menuContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
menuContainer.style.padding = '10px 16px';
menuContainer.style.display = 'none';
menuContainer.style.flexDirection = 'column';
menuContainer.style.gap = '10px';

const inputBase = '0.5rem 0.75rem';
marginInput.style.padding = inputBase;
marginInput.style.border = '1px solid #d1d5db'; // gray-300
marginInput.style.borderRadius = '0.375rem';
marginInput.style.background = '#f9fafb'; // gray-50
marginInput.style.fontSize = '1rem';

paddingInput.style.padding = inputBase;
paddingInput.style.border = '1px solid #d1d5db';
paddingInput.style.borderRadius = '0.375rem';
paddingInput.style.background = '#f9fafb';
paddingInput.style.fontSize = '1rem';

boldBtn.style.background = '#f9fafb';
boldBtn.style.border = '1px solid #d1d5db';
boldBtn.style.borderRadius = '0.375rem';
boldBtn.style.fontWeight = 'bold';
boldBtn.style.fontSize = '1rem';
boldBtn.style.transition = 'background 0.15s';

italicBtn.style.background = '#f9fafb';
italicBtn.style.border = '1px solid #d1d5db';
italicBtn.style.borderRadius = '0.375rem';
italicBtn.style.fontStyle = 'italic';
italicBtn.style.fontSize = '1rem';
italicBtn.style.transition = 'background 0.15s';

underlineBtn.style.background = '#f9fafb';
underlineBtn.style.border = '1px solid #d1d5db';
underlineBtn.style.borderRadius = '0.375rem';
underlineBtn.style.textDecoration = 'underline';
underlineBtn.style.fontSize = '1rem';
underlineBtn.style.transition = 'background 0.15s';

colorInput.style.width = '40px';
colorInput.style.height = '40px';
colorInput.style.border = 'none';
colorInput.style.background = 'none';
colorInput.style.cursor = 'pointer';
colorInput.style.borderRadius = '0.375rem';
colorInput.style.boxShadow = '0 0 0 1px #d1d5db';

restoreBtn.style.background = '#f9fafb';
restoreBtn.style.border = '1px solid #d1d5db';
restoreBtn.style.borderRadius = '0.375rem';
restoreBtn.style.fontSize = '1.1rem';
restoreBtn.style.transition = 'background 0.15s';

closeBtn.style.background = '#f3f4f6';
closeBtn.style.border = '1px solid #d1d5db';
closeBtn.style.borderRadius = '0.375rem';
closeBtn.style.fontSize = '1.2rem';
closeBtn.style.color = '#6b7280'; // gray-500
closeBtn.style.transition = 'background 0.15s';


menuContainer.appendChild(saveBtn);
menuContainer.appendChild(restoreBtn);
document.body.appendChild(menuBtn);
document.body.appendChild(menuContainer);

function setInitialMenuBtnPosition() {
    // Only set if not already set by drag
    if (!menuBtn.style.left || menuBtn.style.left === 'unset') {
        const right = parseInt(menuBtn.style.right, 10) || 20;
        const bottom = parseInt(menuBtn.style.bottom, 10) || 80;
        menuBtn.style.left = (window.innerWidth - right - menuBtn.offsetWidth) + 'px';
        menuBtn.style.top = (window.innerHeight - bottom - menuBtn.offsetHeight) + 'px';
        menuBtn.style.right = '';
        menuBtn.style.bottom = '';
    }
}
setInitialMenuBtnPosition();
window.addEventListener('resize', setInitialMenuBtnPosition);

// --- Drag logic ---
let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;
let wasDragging = false;

menuBtn.addEventListener('mousedown', (e) => {
    isDragging = true;
    wasDragging = false;
    dragOffsetX = e.clientX - menuBtn.getBoundingClientRect().left;
    dragOffsetY = e.clientY - menuBtn.getBoundingClientRect().top;
    document.body.style.userSelect = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        wasDragging = true;
        let x = e.clientX - dragOffsetX;
        let y = e.clientY - dragOffsetY;
        x = Math.max(0, Math.min(window.innerWidth - menuBtn.offsetWidth, x));
        y = Math.max(0, Math.min(window.innerHeight - menuBtn.offsetHeight, y));
        menuBtn.style.left = x + 'px';
        menuBtn.style.top = y + 'px';
        menuBtn.style.right = '';
        menuBtn.style.bottom = '';
        menuContainer.style.left = x + 'px';
        menuContainer.style.top = (y - menuContainer.offsetHeight - 10) + 'px';
        menuContainer.style.right = '';
        menuContainer.style.bottom = '';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
    saveBtn.style.padding = '10px 20px';
    saveBtn.style.margin = '0 0 8px 0';
});

// Only open/close menu if not just dragged
menuBtn.addEventListener('click', () => {
    if (wasDragging) { return; }
    menuContainer.style.display = menuContainer.style.display === 'none' ? 'flex' : 'none';
    // Position menuContainer under the button
    const btnRect = menuBtn.getBoundingClientRect();
    menuContainer.style.left = btnRect.left + 'px';
    menuContainer.style.top = (btnRect.top - menuContainer.offsetHeight - 10) + 'px';
    menuContainer.style.right = '';
    menuContainer.style.bottom = '';
});

document.addEventListener('mousedown', (e) => {
    if (!menuBtn.contains(e.target) && !menuContainer.contains(e.target)) {
        menuContainer.style.display = 'none';
    }
});

// --- End draggable menu ---

let savedSelection = null;
let styleHistory = [];
let contentHistory = [];

// Store the original HTML when the page loads
const originalHTML = document.documentElement.outerHTML;

function saveSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        savedSelection = sel.getRangeAt(0);
    }
}

function restoreSelection() {
    if (savedSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedSelection);
    }
}

let toolbarIsDragging = false, toolbarDragOffsetX = 0, toolbarDragOffsetY = 0;

toolbarDragHandle.addEventListener('mousedown', (e) => {
    toolbarIsDragging = true;
    const rect = toolbar.getBoundingClientRect();
    toolbarDragOffsetX = e.clientX - rect.left;
    toolbarDragOffsetY = e.clientY - rect.top;
    document.body.style.userSelect = 'none';
    toolbar.style.position = 'absolute';
    toolbar.style.left = rect.left + 'px';
    toolbar.style.top = rect.top + 'px';
    toolbar.style.right = '';
    toolbar.style.bottom = '';
    toolbar.style.transform = '';
    e.stopPropagation();
});

document.addEventListener('mousemove', (e) => {
    if (toolbarIsDragging) {
        let x = e.clientX - toolbarDragOffsetX;
        let y = e.clientY - toolbarDragOffsetY;
        // Clamp to viewport (with 8px margin)
        x = Math.max(8, Math.min(window.innerWidth - toolbar.offsetWidth - 8, x));
        y = Math.max(8, Math.min(window.innerHeight - toolbar.offsetHeight - 8, y));
        toolbar.style.left = x + 'px';
        toolbar.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', () => {
    toolbarIsDragging = false;
    document.body.style.userSelect = '';
});

const themeBtn = document.createElement('button');
themeBtn.id = 'toolbar-theme-button';
themeBtn.title = 'Toggle light/dark theme';
themeBtn.textContent = 'ðŸŒ™';
styleToolbarButton(themeBtn);

// 2. Insert theme button into toolbar (before close button)
toolbar.insertBefore(themeBtn, closeBtn);

// 3. Theme toggle logic
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    // Optionally, swap icon
    themeBtn.textContent = document.body.classList.contains('light-theme') ? 'â˜€ï¸' : 'ðŸŒ™';
});

// When showing toolbar, reset to fixed if not dragged
function showToolbarFor(el) {
    // ...existing code...
    if (!toolbar.style.left || !toolbar.style.top || toolbar.style.position !== 'absolute') {
        toolbar.style.position = 'fixed';
        toolbar.style.left = '50%';
        toolbar.style.right = '';
        toolbar.style.bottom = '0';
        toolbar.style.top = '';
        toolbar.style.transform = 'translateX(-50%)';
    }
    toolbar.style.display = 'flex';

    // Set current values
    const computed = window.getComputedStyle(el);
    marginInput.value = parseInt(computed.margin, 10) || 0;
    paddingInput.value = parseInt(computed.padding, 10) || 0;
    boldBtn.style.background = (computed.fontWeight >= 600) ? '#f3f4f6' : ''; // tailwind gray-100
    italicBtn.style.background = (computed.fontStyle === 'italic') ? '#f3f4f6' : '';
}

// When hiding toolbar, reset drag position
function hideToolbar() {
    toolbar.style.display = 'none';
    toolbar.style.position = 'fixed';
    toolbar.style.left = '50%';
    toolbar.style.right = '';
    toolbar.style.bottom = '0';
    toolbar.style.top = '';
    toolbar.style.transform = 'translateX(-50%)';
}
// --- CLEAN SAVE LOGIC ---
function cleanAndSave() {
    // Clone the document to avoid modifying the live DOM
    const docClone = document.documentElement.cloneNode(true);

    // Remove editor UI elements from the clone
    // Remove toolbar by class
    const toolbarClone = docClone.querySelector('.textjs-toolbar');
    if (toolbarClone) toolbarClone.remove();

    // Remove menu button (title="Menu")
    const menuBtnClone = docClone.querySelector('button[title="Menu"]');
    if (menuBtnClone) menuBtnClone.remove();

    // Remove menu container (z-index: 2001)
    const menuContainerClone = docClone.querySelector('div[style*="z-index: 2001"]');
    if (menuContainerClone) menuContainerClone.remove();

    // Remove any Save/Restore buttons that are not part of the page content
    const saveBtnClone = docClone.querySelector('button#save');
    if (saveBtnClone) saveBtnClone.remove();

    // Remove color picker if present
    const colorPickerClone = docClone.querySelector('input#color-picker');
    if (colorPickerClone) colorPickerClone.remove();

    // Remove popups (z-index: 2005)
    docClone.querySelectorAll('div[style*="z-index: 2005"]').forEach(popup => popup.remove());

    // Remove contenteditable and outline from all elements
    docClone.querySelectorAll('[contenteditable]').forEach(el => {
        el.removeAttribute('contenteditable');
        el.style.outline = '';
        el.style.cursor = '';
    });

    // Remove empty style attributes from all elements
    docClone.querySelectorAll('[style]').forEach(el => {
        if (el.getAttribute('style').trim() === '') {
            el.removeAttribute('style');
        }
    });

    // Remove empty style from body
    const bodyClone = docClone.querySelector('body');
    if (bodyClone && bodyClone.getAttribute('style') === '') {
        bodyClone.removeAttribute('style');
    }

    // Serialize the cleaned HTML
    const cleanedHTML = '<!DOCTYPE html>\n' + docClone.outerHTML;

    fetch('/save', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            html: cleanedHTML,
            filename: window.location.pathname.replace('/', '') || 'index.html'
        })
    })
    .then(res => {
        // Optionally, show a small "Saved" indicator here
    })
    .catch(err => {
        // Optionally, handle errors here
    });
}

// Replace saveBtn click handler with cleanAndSave
saveBtn.addEventListener('click', cleanAndSave);

// --- AUTO-SAVE LOGIC ---
let autoSaveTimeout = null;
const AUTO_SAVE_DELAY = 1500; // ms

const observer = new MutationObserver(() => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(cleanAndSave, AUTO_SAVE_DELAY);
});

// Observe changes in the body (you can adjust as needed)
observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
});

// Optionally, also auto-save on input events for better coverage
document.body.addEventListener('input', () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(cleanAndSave, AUTO_SAVE_DELAY);
});
// --- END CLEAN SAVE LOGIC ---

const editableTags = ['h1','h2','h3','h4','h5','h6','p','span','div','li','td','th','a','label','button'];
let currentEditable = null;

// Helper to save style state before changing styles
function saveStyleState() {
    if (currentEditable) {
        styleHistory.push(currentEditable.getAttribute('style') || '');
    }
}

// Helper to save content state before changes
function saveContentState() {
    if (currentEditable) {
        contentHistory.push(currentEditable.innerHTML);
    }
}

// Make elements editable on double-click
editableTags.forEach(tag => {
    document.querySelectorAll(tag).forEach(el => {
        el.addEventListener('dblclick', function(e) {
            // Prevent toolbar, its children, menuBtn, or menuContainer from being editable
            if (
                toolbar.contains(el) || el === toolbar ||
                el === menuBtn || menuBtn.contains(el) ||
                el === menuContainer || menuContainer.contains(el)
            ) return;

            // --- Reset previous editable if any ---
            if (currentEditable && currentEditable !== el) {
                currentEditable.contentEditable = "false";
                currentEditable.style.outline = '';
                currentEditable.style.cursor = '';
            }
            // --- End reset ---

            currentEditable = el;
            el.contentEditable = "true";
            el.style.outline = '1px dashed #101010';
            el.style.cursor = 'text';
            showToolbarFor(el);
            saveContentState();
            e.stopPropagation();
        });
    });
});

// Only close toolbar when close button is clicked
closeBtn.addEventListener('click', () => {
    if (currentEditable) {
        currentEditable.contentEditable = "false";
        currentEditable.style.outline = '';
        currentEditable.style.cursor = '';
        currentEditable = null;
        hideToolbar();
    }
});

function hideToolbar() {
    toolbar.style.display = 'none';
    toolbar.style.position = 'fixed';
    toolbar.style.left = '0';
    toolbar.style.right = '0';
    toolbar.style.bottom = '0';
    toolbar.style.top = '';
}

// Formatting handlers with setTimeout to restore selection
boldBtn.addEventListener('click', () => {
    setTimeout(() => {
        restoreSelection();
        document.execCommand('bold', false, null);
        showToolbarFor(currentEditable);
    }, 0);
});

italicBtn.addEventListener('click', () => {
    setTimeout(() => {
        restoreSelection();
        document.execCommand('italic', false, null);
        showToolbarFor(currentEditable);
    }, 0);
});

underlineBtn.addEventListener('click', () => {
    setTimeout(() => {
        restoreSelection();
        document.execCommand('underline', false, null);
        showToolbarFor(currentEditable);
    }, 0);
});

colorInput.addEventListener('input', function() {
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, colorInput.value);
});

marginInput.addEventListener('input', () => {
    if (currentEditable) {
        saveStyleState();
        currentEditable.style.margin = marginInput.value + 'px';
    }
});

paddingInput.addEventListener('input', () => {
    if (currentEditable) {
        saveStyleState();
        currentEditable.style.padding = paddingInput.value + 'px';
    }
});

// Restore button handler: reloads the page to restore original HTML
restoreBtn.addEventListener('click', () => {
    location.reload();
});

function createPopup(label, input) {
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.bottom = '60px';
    popup.style.left = '0';
    popup.style.background = '#fff';
    popup.style.border = '1px solid #d1d5db';
    popup.style.borderRadius = '0.5rem';
    popup.style.boxShadow = '0 4px 24px 0 rgba(0,0,0,0.10)';
     popup.style.padding = '8px 10px'; // Increased vertical padding
    popup.style.fontSize = '1rem';
    popup.style.color = '#111827';
    popup.style.display = 'none';
    popup.style.zIndex = '2005';
   popup.style.minWidth = '90px';    // Smaller min width
    popup.style.minHeight = '40px'; // Increased minHeight
    popup.style.textAlign = 'center';

    const labelEl = document.createElement('div');
    labelEl.textContent = label;
    labelEl.style.marginBottom = '12px';
    labelEl.style.fontWeight = '500';

    input.style.margin = '0 auto';
    popup.appendChild(labelEl);
    popup.appendChild(input);

    document.body.appendChild(popup);
    return popup;
}
// Create clones for popups (so toolbar still has the original inputs)
const marginInputPopup = document.createElement('input');
marginInputPopup.type = 'number';
marginInputPopup.min = '0';
marginInputPopup.max = '200';
marginInputPopup.value = marginInput.value;
marginInputPopup.style.width = '70px';
marginInputPopup.style.padding = '0.5rem 0.75rem';
marginInputPopup.style.border = '1px solid #d1d5db';
marginInputPopup.style.borderRadius = '0.375rem';
marginInputPopup.style.background = '#f9fafb';
marginInputPopup.style.fontSize = '1rem';

const paddingInputPopup = document.createElement('input');
paddingInputPopup.type = 'number';
paddingInputPopup.min = '0';
paddingInputPopup.max = '200';
paddingInputPopup.value = paddingInput.value;
paddingInputPopup.style.width = '70px';
paddingInputPopup.style.padding = '0.5rem 0.75rem';
paddingInputPopup.style.border = '1px solid #d1d5db';
paddingInputPopup.style.borderRadius = '0.375rem';
paddingInputPopup.style.background = '#f9fafb';
paddingInputPopup.style.fontSize = '1rem';

const marginPopup = createPopup('Margin (px)', marginInputPopup);
const paddingPopup = createPopup('Padding (px)', paddingInputPopup);

marginPopup.classList.add('toolbar-popup', 'margin-popup');
paddingPopup.classList.add('toolbar-popup', 'padding-popup');

// --- Toolbar buttons for margin/padding popups ---
// --- Toolbar buttons for margin/padding popups ---
const marginBtn = document.createElement('button');
marginBtn.textContent = 'Margin';
marginBtn.title = 'Set margin';
marginBtn.style.background = '#f9fafb';
marginBtn.style.border = '1px solid #d1d5db';
marginBtn.style.borderRadius = '0.375rem';
marginBtn.style.fontSize = '1rem';
marginBtn.style.cursor = 'pointer';
marginBtn.style.transition = 'background 0.15s';
marginBtn.style.fontFamily = 'Verdana, Geneva, sans-serif';
// Add these lines for consistent size:
marginBtn.style.width = '110px';
marginBtn.style.height = '40px';
marginBtn.style.minWidth = '110px';
marginBtn.style.minHeight = '40px';
marginBtn.style.boxSizing = 'border-box';
marginBtn.style.display = 'inline-flex';
marginBtn.style.alignItems = 'center';
marginBtn.style.justifyContent = 'center';
marginBtn.style.padding = '0 12px';

const paddingBtn = document.createElement('button');
paddingBtn.textContent = 'Padding';
paddingBtn.title = 'Set padding';
paddingBtn.style.background = '#f9fafb';
paddingBtn.style.border = '1px solid #d1d5db';
paddingBtn.style.borderRadius = '0.375rem';
paddingBtn.style.fontSize = '1rem';
paddingBtn.style.cursor = 'pointer';
paddingBtn.style.transition = 'background 0.15s';
paddingBtn.style.fontFamily = 'Verdana, Geneva, sans-serif';
// Add these lines for consistent size:
paddingBtn.style.width = '110px';
paddingBtn.style.height = '40px';
paddingBtn.style.minWidth = '110px';
paddingBtn.style.minHeight = '40px';
paddingBtn.style.boxSizing = 'border-box';
paddingBtn.style.display = 'inline-flex';
paddingBtn.style.alignItems = 'center';
paddingBtn.style.justifyContent = 'center';
paddingBtn.style.padding = '0 12px';

// Remove old margin/padding inputs from toolbar if present
if (toolbar.contains(marginInput)) toolbar.removeChild(marginInput);
if (toolbar.contains(paddingInput)) toolbar.removeChild(paddingInput);

// Add popup buttons to toolbar
toolbar.insertBefore(marginBtn, boldBtn);
toolbar.insertBefore(paddingBtn, boldBtn);

// --- Popup logic ---
function showPopup(btn, popup) {
    const rect = btn.getBoundingClientRect();
    popup.style.left = rect.left + window.scrollX + 'px';
    popup.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
    popup.style.display = 'block';
}
function hidePopups() {
    marginPopup.style.display = 'none';
    paddingPopup.style.display = 'none';
}
marginBtn.addEventListener('click', (e) => {
    hidePopups();
    showPopup(marginBtn, marginPopup);
    marginInputPopup.value = marginInput.value;
    e.stopPropagation();
});
paddingBtn.addEventListener('click', (e) => {
    hidePopups();
    showPopup(paddingBtn, paddingPopup);
    paddingInputPopup.value = paddingInput.value;
    e.stopPropagation();
});
document.addEventListener('mousedown', (e) => {
    if (!marginPopup.contains(e.target) && !paddingPopup.contains(e.target) &&
        e.target !== marginBtn && e.target !== paddingBtn) {
        hidePopups();
    }
});

// Sync popup input changes to main input and editable element
marginInputPopup.addEventListener('input', () => {
    marginInput.value = marginInputPopup.value;
    if (currentEditable) {
        saveStyleState();
        currentEditable.style.margin = marginInput.value + 'px';
    }
});
paddingInputPopup.addEventListener('input', () => {
    paddingInput.value = paddingInputPopup.value;
    if (currentEditable) {
        saveStyleState();
        currentEditable.style.padding = paddingInput.value + 'px';
    }
});

// Also sync main input changes to popup if user uses keyboard
marginInput.addEventListener('input', () => {
    marginInputPopup.value = marginInput.value;
});
paddingInput.addEventListener('input', () => {
    paddingInputPopup.value = paddingInput.value;
});

let toolbarLastRect = null;

function showPopup(btn, popup) {
    const btnRect = btn.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    toolbarLastRect = toolbarRect; // Save for dragging

    // Position popup relative to toolbar and button
    popup.style.position = 'absolute';
    popup.style.left = (btnRect.left - toolbarRect.left - 26) + 'px';
    popup.style.top = (btnRect.top - toolbarRect.bottom - 40) + 'px';
    popup.style.display = 'block';

    // Attach popup to toolbar so it moves with it
    toolbar.appendChild(popup);
}

function hidePopups() {
    marginPopup.style.display = 'none';
    paddingPopup.style.display = 'none';
    // Move popups back to body (optional, for cleanup)
    if (marginPopup.parentNode !== document.body) document.body.appendChild(marginPopup);
    if (paddingPopup.parentNode !== document.body) document.body.appendChild(paddingPopup);
}

marginBtn.addEventListener('click', (e) => {
    hidePopups();
    showPopup(marginBtn, marginPopup);
    marginInputPopup.value = marginInput.value;
    e.stopPropagation();
});
paddingBtn.addEventListener('click', (e) => {
    hidePopups();
    showPopup(paddingBtn, paddingPopup);
    paddingInputPopup.value = paddingInput.value;
    e.stopPropagation();
});
document.addEventListener('mousedown', (e) => {
    if (!marginPopup.contains(e.target) && !paddingPopup.contains(e.target) &&
        e.target !== marginBtn && e.target !== paddingBtn) {
        hidePopups();
    }
});

// --- Make popups move with toolbar when dragging ---
let popupWasOpen = {margin: false, padding: false};

let toolbarHasBeenDragged = false; // <-- Add this flag

toolbarDragHandle.addEventListener('mousedown', (e) => {
    toolbarIsDragging = true;
    toolbarHasBeenDragged = true; // <-- Set flag when user drags
    toolbarDragOffsetX = e.pageX - toolbar.offsetLeft;
    document.body.style.userSelect = 'none';
    toolbar.style.position = 'fixed';
    toolbar.style.transform = '';
    toolbar.style.top = 'auto';
    toolbar.style.bottom = '0'; // Always flush with bottom
    toolbar.style.right = '';
    e.stopPropagation();
});

document.addEventListener('mousemove', (e) => {
    if (toolbarIsDragging) {
        let x = e.pageX - toolbarDragOffsetX;
        x = Math.max(8, Math.min(window.innerWidth - toolbar.offsetWidth - 8, x));
        toolbar.style.left = x + 'px';
        toolbar.style.top = 'auto';
        toolbar.style.bottom = '0'; // Always flush with bottom
    }
});

document.addEventListener('mouseup', () => {
    if (toolbarIsDragging) {
        toolbarIsDragging = false;
        document.body.style.userSelect = '';
        // Ensure toolbar is flush with bottom after drag
        toolbar.style.top = 'auto';
        toolbar.style.bottom = '0';
    }
});
// ...existing code...

// Helper: Convert rgb to hex
function rgb2hex(rgb) {
    if (!rgb) return '';
    const result = rgb.match(/\d+/g);
    if (!result) return '';
    return (
        '#' +
        result
            .slice(0, 3)
            .map(x => ('0' + parseInt(x).toString(16)).slice(-2))
            .join('')
    );
}