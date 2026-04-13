document.addEventListener('DOMContentLoaded', () => {
    const registryContainer = document.getElementById('registry-container');

    // Model Data
    const modelData = [
        { name: 'GPT-4o', provider: 'GPT Models' },
        { name: 'GPT-4 Turbo', provider: 'GPT Models' },
        { name: 'GPT-3.5 Turbo', provider: 'GPT Models' },
        { name: 'GPT-4o mini', provider: 'GPT Models' },
        { name: 'Claude 3.5 Sonnet', provider: 'Claude Models' },
        { name: 'Claude 3 Opus', provider: 'Claude Models' },
        { name: 'Claude 3 Haiku', provider: 'Claude Models' },
        { name: 'Claude 2.1', provider: 'Claude Models' },
        { name: 'Gemini 1.5 Pro', provider: 'Gemini Models' },
        { name: 'Gemini 1.5 Flash', provider: 'Gemini Models' },
        { name: 'Gemini 1.0 Pro', provider: 'Gemini Models' },
        { name: 'Grok-1', provider: 'Grok Models' },
        { name: 'Grok-1.5', provider: 'Grok Models' },
        { name: 'Grok-2', provider: 'Grok Models' },
        { name: 'Grok-2 mini', provider: 'Grok Models' }
    ];

    // Group models by provider
    const groupedModels = modelData.reduce((acc, model) => {
        if (!acc[model.provider]) {
            acc[model.provider] = [];
        }
        acc[model.provider].push(model);
        return acc;
    }, {});

    // Sort providers and their models
    const sortedProviders = Object.keys(groupedModels).sort();
    
    // Clear loading state
    registryContainer.innerHTML = '';

    // Render each provider section
    sortedProviders.forEach((provider, index) => {
        const models = groupedModels[provider].sort((a, b) => a.name.localeCompare(b.name));
        
        const card = document.createElement('div');
        card.className = `provider-card ${index === 0 ? 'open' : ''}`; // Open first one by default
        
        const header = document.createElement('button');
        header.className = 'provider-header';
        header.innerHTML = `
            <span class="provider-name">${provider}</span>
            <span class="chevron"></span>
        `;
        
        const content = document.createElement('div');
        content.className = 'provider-content';
        
        if (index === 0) {
            content.style.maxHeight = '1000px';
        }

        const list = document.createElement('ul');
        list.className = 'model-list';
        
        models.forEach(model => {
            const item = document.createElement('li');
            item.className = 'model-item';
            item.innerHTML = `
                <div class="model-info">
                    <span class="model-name">${model.name}</span>
                    <span class="model-provider-badge">${model.provider}</span>
                </div>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                </label>
            `;
            list.appendChild(item);
        });
        
        content.appendChild(list);
        card.appendChild(header);
        card.appendChild(content);
        registryContainer.appendChild(card);
        
        // Add click event for toggle
        header.addEventListener('click', () => {
            const isOpen = card.classList.contains('open');
            
            // Close other cards (optional, but follows common accordion patterns)
            // document.querySelectorAll('.provider-card').forEach(c => {
            //     c.classList.remove('open');
            //     c.querySelector('.provider-content').style.maxHeight = '0';
            // });

            if (!isOpen) {
                card.classList.add('open');
                content.style.maxHeight = '1000px';
            } else {
                card.classList.remove('open');
                content.style.maxHeight = '0';
            }
        });
    });
});
