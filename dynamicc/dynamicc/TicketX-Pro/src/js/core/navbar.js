// ============ DYNAMIC NAVBAR MANAGER ============

const NAVBAR_ITEMS = [
    {
        id: 'movies',
        label: '🎬 Movies',
        href: '#movies',
        type: 'link',
        requiresLogin: false,
        target: ''
    },
    {
        id: 'trains',
        label: '🚂 Trains',
        href: '#trains',
        type: 'link',
        requiresLogin: false,
        target: ''
    },
    {
        id: 'flights',
        label: '✈️ Flights',
        href: '#flights',
        type: 'link',
        requiresLogin: false,
        target: ''
    },
    {
        id: 'bus',
        label: '🚌 Bus',
        href: '#bus',
        type: 'link',
        requiresLogin: false,
        target: ''
    },
    {
        id: 'events',
        label: '🎤 Events',
        href: '#events',
        type: 'link',
        requiresLogin: false,
        target: ''
    },
    {
        id: 'user-auth',
        label: 'Login',
        href: 'javascript:void(0)',
        type: 'button',
        requiresLogin: false,
        target: '',
        class: 'btn-login',
        onclick: 'handleUserClick()'
    }
];

class NavbarManager {
    static renderNavbar() {
        const navMenu = document.getElementById('navbarMenu');
        if (!navMenu) return;

        navMenu.innerHTML = NAVBAR_ITEMS.map(item => {
            if (item.type === 'link') {
                return `
                    <li>
                        <a href="${item.href}" class="nav-link" data-section="${item.id}">
                            ${item.label}
                        </a>
                    </li>
                `;
            } else if (item.type === 'button') {
                return `
                    <li>
                        <button 
                            class="btn-login ${item.class || ''}" 
                            id="${item.id}"
                            onclick="${item.onclick}"
                        >
                            ${item.label}
                        </button>
                    </li>
                `;
            }
        }).join('');

        this.updateNavbarState();
    }

    static updateNavbarState() {
        const user = Auth.getCurrentUser();
        const authButton = document.getElementById('user-auth');

        if (authButton) {
            if (user) {
                authButton.textContent = `👤 ${user.name}`;
                authButton.onclick = () => showUserMenu(user);
            } else {
                authButton.textContent = '🔓 Login';
                authButton.onclick = () => goToLogin();
            }
        }
    }

    static addNavbarItem(item) {
        NAVBAR_ITEMS.push(item);
        this.renderNavbar();
    }

    static removeNavbarItem(id) {
        const index = NAVBAR_ITEMS.findIndex(item => item.id === id);
        if (index > -1) {
            NAVBAR_ITEMS.splice(index, 1);
            this.renderNavbar();
        }
    }

    static updateNavbarItem(id, updates) {
        const item = NAVBAR_ITEMS.find(item => item.id === id);
        if (item) {
            Object.assign(item, updates);
            this.renderNavbar();
        }
    }

    static getNavbarItems() {
        return NAVBAR_ITEMS;
    }

    static getNavbarItemById(id) {
        return NAVBAR_ITEMS.find(item => item.id === id);
    }

    // Add smooth scroll to sections
    static initSmoothScroll() {
        document.querySelectorAll('a.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const sectionId = this.getAttribute('data-section');
                if (sectionId) {
                    e.preventDefault();
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // Highlight active section on scroll
    static initScrollHighlight() {
        window.addEventListener('scroll', () => {
            let current = '';
            
            NAVBAR_ITEMS.forEach(item => {
                if (item.type === 'link') {
                    const section = document.getElementById(item.id);
                    if (section) {
                        const sectionTop = section.offsetTop;
                        if (pageYOffset >= sectionTop - 60) {
                            current = item.id;
                        }
                    }
                }
            });

            document.querySelectorAll('a.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    NavbarManager.renderNavbar();
    NavbarManager.initSmoothScroll();
    NavbarManager.initScrollHighlight();

    // Update navbar when user logs in/out
    window.addEventListener('storage', function(e) {
        if (e.key === 'tx_session') {
            NavbarManager.updateNavbarState();
        }
    });
});

// Listen for auth changes
const originalLogout = Auth.logout;
Auth.logout = function() {
    NavbarManager.updateNavbarState();
    originalLogout.call(Auth);
};
