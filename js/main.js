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