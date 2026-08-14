window.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`ol li a[href="#${id}"]`);
            if (!link) return;
            if (entry.intersectionRatio > 0) {
                link.parentElement.classList.add('active');
            } else {
                link.parentElement.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
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
