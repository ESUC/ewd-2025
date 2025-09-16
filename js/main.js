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

        if (options.forceEsuc) {
            const esuc = items.find(i => (i.querySelector('.org-name')?.textContent || '').toLowerCase().includes('engineering society at ucla'));
            if (esuc) {
                const badge = esuc.querySelector('.table-number');
                if (badge) badge.textContent = 'Table 1';
                nextNum = 2;
            }
        }

        const getAllocationFor = (name) => {
            const n = name.toLowerCase();
            if (n.includes('association for computing machinery') || n.includes('(acm)') || n.includes(' acm')) return 5;
            if (n.includes('society of women engineers')) return 4;
            if (n.includes('institute of electrical and electronics engineers') || n.includes(' ieee')) return 4;
            return 1;
        };

        items.forEach(item => {
            const nameEl = item.querySelector('.org-name');
            const badgeEl = item.querySelector('.table-number');
            if (!nameEl || !badgeEl) return;
            if (options.forceEsuc && nameEl.textContent.toLowerCase().includes('engineering society at ucla')) return;

            const allocation = getAllocationFor(nameEl.textContent.trim());
            const start = nextNum;
            const end = nextNum + allocation - 1;
            badgeEl.textContent = allocation === 1 ? `Table ${start}` : `Tables ${start}-${end}`;
            nextNum = end + 1;
        });
    };

    // Number every venue block under #orgs.
    const venueContainers = Array.from(document.querySelectorAll('#orgs .orgs-container'));
    venueContainers.forEach((container, index) => {
        numberVenue(container, { forceEsuc: index === 0 });
    });
});

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