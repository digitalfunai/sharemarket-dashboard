document.addEventListener('DOMContentLoaded', () => {
    const user = auth.getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    let currentTab = 'profile';
    const navButtons = document.querySelectorAll('.settings-nav button');
    const settingsForm = document.getElementById('settingsForm');

    if (!settingsForm) return;

    navButtons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.textContent.toLowerCase();
            updateFormContent(currentTab);
        });
    });

    function updateFormContent(tab) {
        const userEmail = user?.email || 'user@example.com';
        const userName = user?.name || 'User';

        if (tab === 'profile') {
            settingsForm.innerHTML = `
                <h4 class="heading mb-4">Profile information</h4>
                <div class="row g-3">
                    <div class="col-md-6"><label class="form-label">Full name</label><input class="form-control premium-input" id="fullName" value="${userName}"></div>
                    <div class="col-md-6"><label class="form-label">Email</label><input class="form-control premium-input" id="email" value="${userEmail}" readonly></div>
                    <div class="col-md-6"><label class="form-label">Mobile</label><input class="form-control premium-input" id="mobile" value="+91 98765 43210"></div>
                    <div class="col-md-6"><label class="form-label">Default broker</label><select class="form-select premium-input" id="broker">
                        <option selected>Zerodha</option>
                        <option>Groww</option>
                        <option>ICICI Direct</option>
                    </select></div>
                    <div class="col-12"><button class="btn btn-primary-pro" type="submit">Save Changes</button></div>
                </div>
            `;
        } else if (tab === 'appearance') {
            settingsForm.innerHTML = `
                <h4 class="heading mb-4">Appearance</h4>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Theme</label>
                        <select class="form-select premium-input" id="theme">
                            <option value="dark" selected>Dark</option>
                            <option value="light">Light</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Chart Style</label>
                        <select class="form-select premium-input" id="chartStyle">
                            <option selected>Candlestick</option>
                            <option>Line</option>
                            <option>Area</option>
                        </select>
                    </div>
                    <div class="col-12">
                        <label class="form-label">
                            <input type="checkbox" id="compactMode" class="form-check-input"> Compact Mode
                        </label>
                    </div>
                    <div class="col-12"><button class="btn btn-primary-pro" type="submit">Save Changes</button></div>
                </div>
            `;
        } else if (tab === 'notifications') {
            settingsForm.innerHTML = `
                <h4 class="heading mb-4">Notification Preferences</h4>
                <div class="row g-3">
                    <div class="col-12">
                        <label class="form-label"><input type="checkbox" class="form-check-input" checked> Email alerts for price movements</label>
                    </div>
                    <div class="col-12">
                        <label class="form-label"><input type="checkbox" class="form-check-input" checked> Push notifications for orders</label>
                    </div>
                    <div class="col-12">
                        <label class="form-label"><input type="checkbox" class="form-check-input"> News digest</label>
                    </div>
                    <div class="col-12">
                        <label class="form-label"><input type="checkbox" class="form-check-input" checked> Market open/close alerts</label>
                    </div>
                    <div class="col-12"><button class="btn btn-primary-pro" type="submit">Save Changes</button></div>
                </div>
            `;
        } else if (tab === 'trading') {
            settingsForm.innerHTML = `
                <h4 class="heading mb-4">Trading Defaults</h4>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label">Default Order Type</label>
                        <select class="form-select premium-input" id="orderType">
                            <option selected>Market</option>
                            <option>Limit</option>
                            <option>Stop-Loss</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Default Validity</label>
                        <select class="form-select premium-input" id="validity">
                            <option selected>Day</option>
                            <option>IOC</option>
                            <option>GTC</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Default Quantity</label>
                        <input type="number" class="form-control premium-input" id="defaultQty" value="1">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Product Type</label>
                        <select class="form-select premium-input" id="productType">
                            <option selected>MIS</option>
                            <option>CNC</option>
                            <option>NRML</option>
                        </select>
                    </div>
                    <div class="col-12"><button class="btn btn-primary-pro" type="submit">Save Changes</button></div>
                </div>
            `;
        } else if (tab === 'security') {
            settingsForm.innerHTML = `
                <h4 class="heading mb-4">Security Settings</h4>
                <div class="row g-3">
                    <div class="col-12">
                        <label class="form-label">Change Password</label>
                        <input type="password" class="form-control premium-input" id="oldPassword" placeholder="Current password">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">New Password</label>
                        <input type="password" class="form-control premium-input" id="newPassword">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" class="form-control premium-input" id="confirmPassword">
                    </div>
                    <div class="col-12">
                        <label class="form-label"><input type="checkbox" class="form-check-input" checked> Two-factor authentication</label>
                    </div>
                    <div class="col-12"><button class="btn btn-primary-pro" type="submit">Update Security</button></div>
                </div>
            `;
        }

        const themeSelect = document.getElementById('theme');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => {
                if (e.target.value !== 'auto') {
                    document.documentElement.setAttribute('data-theme', e.target.value);
                    localStorage.setItem('theme', e.target.value);
                }
            });
        }
    }

    updateFormContent('profile');

    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentTab === 'profile') {
            const fullName = document.getElementById('fullName')?.value;
            if (fullName && fullName !== user.name) {
                auth.updateProfile(fullName);
            }
        }
        showToast('✓ Settings saved successfully');
    });
});