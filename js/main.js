window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                document.querySelector(`ol li a[href="#${id}"]`).parentElement.classList.add('active');
            } else {
                document.querySelector(`ol li a[href="#${id}"]`).parentElement.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });

    const numberVenue = (rootEl, options = {}) => {
        if (!rootEl) return;
        const items = Array.from(rootEl.querySelectorAll('.org-item'));
        let nextNum = 1;

        const getAllocationFor = (name) => {
            const n = name.toLowerCase();
            if (n.includes('association for computing machinery') || n.includes('(acm)') || n.includes(' acm')) return 3;
            if (n.includes('society of women engineers')) return 1;
            if (n.includes('institute of electrical and electronics engineers') || n.includes(' ieee')) return 2;
            return 1;
        };

        // First, handle ESUC to be table 1
        const esucItem = items.find(item => {
            const nameEl = item.querySelector('.org-name');
            return nameEl && nameEl.textContent.toLowerCase().includes('engineering society at ucla');
        });
        
        if (esucItem) {
            const badgeEl = esucItem.querySelector('.table-number');
            if (badgeEl) {
                badgeEl.textContent = 'Table 1';
                nextNum = 2;
            }
        }

        // Then handle all other items sequentially
        items.forEach(item => {
            const nameEl = item.querySelector('.org-name');
            const badgeEl = item.querySelector('.table-number');
            if (!nameEl || !badgeEl) return;
            
            // Skip ESUC since we already handled it
            if (nameEl.textContent.toLowerCase().includes('engineering society at ucla')) return;

            const allocation = getAllocationFor(nameEl.textContent.trim());
            const start = nextNum;
            const end = nextNum + allocation - 1;
            badgeEl.textContent = allocation === 1 ? `Table ${start}` : `Tables ${start}-${end}`;
            nextNum = end + 1;
        });
    };

    // Number all organizations in one continuous sequence
    const allOrgItems = Array.from(document.querySelectorAll('#orgs .org-item'));
    let nextNum = 1;
    const processedNames = new Set();
    const sharedTables = new Map();

    const getAllocationFor = (name) => {
        const n = name.toLowerCase();
        if (n.includes('association for computing machinery') || n.includes('(acm)') || n.includes(' acm')) return 3;
        if (n.includes('society of women engineers')) return 1;
        if (n.includes('institute of electrical and electronics engineers') || n.includes(' ieee')) return 2;
        return 1;
    };

    const getTableSharing = (name) => {
        const n = name.toLowerCase();
        return null;
    };

    // First, handle ESUC to be table 1
    const esucItem = allOrgItems.find(item => {
        const nameEl = item.querySelector('.org-name');
        return nameEl && nameEl.textContent.toLowerCase().includes('engineering society at ucla');
    });
    
    if (esucItem) {
        const badgeEl = esucItem.querySelector('.table-number');
        if (badgeEl) {
            badgeEl.textContent = 'Table 1';
            nextNum = 2;
            const nameEl = esucItem.querySelector('.org-name');
            if (nameEl) {
                processedNames.add(nameEl.textContent.trim().toLowerCase());
            }
        }
    }

    // Then handle all other items sequentially
    allOrgItems.forEach(item => {
        const nameEl = item.querySelector('.org-name');
        const badgeEl = item.querySelector('.table-number');
        if (!nameEl || !badgeEl) return;
        
        const orgName = nameEl.textContent.trim().toLowerCase();
        
        // Skip ESUC since we already handled it
        if (orgName.includes('engineering society at ucla')) return;
        
        // Skip if we've already processed this organization name
        if (processedNames.has(orgName)) {
            console.log(`Skipping duplicate: ${nameEl.textContent.trim()}`);
            return;
        }

        // Special case: Out in STEM at UCLA gets a fixed table assignment
        if (orgName.includes('out in stem')) {
            badgeEl.textContent = 'Table 42';
            console.log(`Assigned ${nameEl.textContent.trim()} to Table 42 (fixed)`);
            // Ensure no one else receives Table 42 later
            if (nextNum <= 42) {
                nextNum = 43;
            }
            processedNames.add(orgName);
            return;
        }

        // Check if this organization shares a table with another
        const sharingGroup = getTableSharing(nameEl.textContent.trim());
        if (sharingGroup) {
            if (sharedTables.has(sharingGroup)) {
                // Use the same table number as the first organization in this sharing group
                const sharedTableNumber = sharedTables.get(sharingGroup);
                badgeEl.textContent = sharedTableNumber;
                console.log(`Assigned ${nameEl.textContent.trim()} to shared ${sharedTableNumber}`);
            } else {
                // First organization in this sharing group, assign new table number
                const allocation = getAllocationFor(nameEl.textContent.trim());
                const start = nextNum;
                const end = nextNum + allocation - 1;
                const tableNumber = allocation === 1 ? `Table ${start}` : `Tables ${start}-${end}`;
                badgeEl.textContent = tableNumber;
                sharedTables.set(sharingGroup, tableNumber);
                console.log(`Assigned ${nameEl.textContent.trim()} to new shared ${tableNumber}`);
                nextNum = end + 1;
            }
        } else {
            // Regular organization, assign normal table number
            const allocation = getAllocationFor(nameEl.textContent.trim());
            const start = nextNum;
            const end = nextNum + allocation - 1;
            badgeEl.textContent = allocation === 1 ? `Table ${start}` : `Tables ${start}-${end}`;
            console.log(`Assigned ${nameEl.textContent.trim()} to ${badgeEl.textContent}`);
            nextNum = end + 1;
        }
        
        // Mark this organization as processed
        processedNames.add(orgName);
    });

    // Simple tooltip for clicking table numbers to reveal organization names
    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'org-tooltip hidden';
    tooltipEl.setAttribute('role', 'status');
    document.body.appendChild(tooltipEl);

    let tooltipAnchor = null;

    const hideTooltip = () => {
        if (!tooltipEl.classList.contains('hidden')) {
            tooltipEl.classList.add('hidden');
            tooltipEl.textContent = '';
            tooltipAnchor = null;
        }
    };

    const showTooltip = (anchorEl, text) => {
        tooltipEl.textContent = text;
        const rect = anchorEl.getBoundingClientRect();
        const top = window.scrollY + rect.top - tooltipEl.offsetHeight - 8;
        const left = window.scrollX + rect.left + rect.width / 2;
        tooltipEl.style.top = `${Math.max(0, top)}px`;
        tooltipEl.style.left = `${Math.max(8, left)}px`;
        tooltipEl.classList.remove('hidden');
        tooltipAnchor = anchorEl;
    };

    document.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList && target.classList.contains('table-number')) {
            const parent = target.closest('.org-item');
            const nameEl = parent ? parent.querySelector('.org-name') : null;
            const name = nameEl ? nameEl.textContent.trim() : '';
            if (!name) return;
            if (tooltipAnchor === target && !tooltipEl.classList.contains('hidden')) {
                hideTooltip();
            } else {
                showTooltip(target, name);
            }
        } else if (!tooltipEl.contains(target)) {
            hideTooltip();
        }
    });

    window.addEventListener('scroll', hideTooltip, { passive: true });
    window.addEventListener('resize', hideTooltip);
});

// ADDED

function search() {
    let input = document.getElementById("search").value.replace(/[^0-9a-z]/gi, '').toLowerCase();
    let cards = document.getElementsByClassName("card");
    for (let item of cards) {
        if (item.dataset.names.toLowerCase().search(input) == -1) {
            document.getElementById(item.id).style.display = 'none';
        } else {
            document.getElementById(item.id).style.display = 'grid';
        }
    }
}