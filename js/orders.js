
let status = 'open';
let orders = JSON.parse(JSON.stringify(FINORA_DATA.orders));

function formatPrice(price) {
    if (typeof price === 'string') {
        return price;
    }
    return '' + Number(price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

document.addEventListener('DOMContentLoaded', () => {
    renderOrders();

    const orderTabs = document.querySelectorAll('#orderTabs button');
    orderTabs.forEach(b => {
        b.addEventListener('click', () => {
            orderTabs.forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            status = b.dataset.status;
            renderOrders();
        });
    });

    const orderSearch = document.getElementById('orderSearch');
    if (orderSearch) {
        orderSearch.addEventListener('input', renderOrders);
    }
});

function renderOrders() {
    const q = document.getElementById('orderSearch')?.value.toLowerCase() || '';
    const filtered = orders.filter(x =>
        x.status === status && (x.symbol.toLowerCase().includes(q))
    );

    const ordersBody = document.getElementById('ordersBody');
    if (!ordersBody) return;

    ordersBody.innerHTML = filtered.map((x, i) => `
        <tr>
            <td>${x.time}</td>
            <td><strong>${x.symbol}</strong></td>
            <td><span class="order-side ${x.side === 'BUY' ? 'trend-up' : 'trend-down'}">${x.side}</span></td>
            <td>${x.product}</td>
            <td>${x.qty}</td>
            <td>${formatPrice(x.price)}</td>
            <td>${x.trigger ? formatPrice(x.trigger) : '—'}</td>
            <td><span class="badge-soft text-capitalize">${x.status}</span></td>
            <td>${['open', 'pending'].includes(x.status) ?
                `<div class="d-flex gap-2">
                    <button class="btn btn-soft btn-sm" onclick="modifyOrder(${i})">Modify</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="cancelOrder(${i})">Cancel</button>
                </div>` :
                '<button class="icon-btn"><i class="bi bi-receipt"></i></button>'
            }</td>
        </tr>
    `).join('');

    const ordersEmpty = document.getElementById('ordersEmpty');
    if (ordersEmpty) {
        ordersEmpty.classList.toggle('d-none', filtered.length > 0);
    }
}

function modifyOrder(index) {
    const order = orders[index];
    const newQty = prompt(`Modify quantity for ${order.symbol}:`, order.qty);
    if (newQty && newQty !== order.qty) {
        orders[index].qty = parseInt(newQty);
        renderOrders();
        showToast(`✓ ${order.symbol} order modified successfully`);
    }
}

function cancelOrder(index) {
    const order = orders[index];
    if (confirm(`Cancel order for ${order.symbol}?`)) {
        orders[index].status = 'cancelled';
        renderOrders();
        showToast(`✓ ${order.symbol} order cancelled`);
    }
}
