document.addEventListener('DOMContentLoaded', () => {
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addItemBtn = document.getElementById('addItemBtn');
    const projectModal = document.getElementById('projectModal');
    const itemModal = document.getElementById('itemModal');
    const closeBtn = document.querySelector('.closeBtn');
    const closeItemModalBtn = document.querySelector('.closeItemModalBtn');
    const confirmAddProject = document.getElementById('confirmAddProject');
    const confirmAddItem = document.getElementById('confirmAddItem');
    const projectTitleInput = document.getElementById('projectTitle');
    const itemTitleInput = document.getElementById('itemTitle');
    const itemDescriptionInput = document.getElementById('itemDescription');
    const itemPriorityInput = document.getElementById('itemPriority');
    const projectListContainer = document.getElementById('projectListContainer');
    const bodyTitle = document.querySelector('.bodyTitle');
    const itemListContainer = document.getElementById('itemListContainer');

    // Set initial bodyTitle and itemListContainer content
    bodyTitle.textContent = "No Projects";
    itemListContainer.textContent = "No current items";

    // Object to store projects and their items
    const projects = {};

    // Show the modal when the "Add Project" button is clicked
    addProjectBtn.addEventListener('click', () => {
        projectModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeBtn.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    // Show the item modal when the "Add Item" button is clicked
    addItemBtn.addEventListener('click', () => {
        itemModal.style.display = 'block';
    });

    // Close the item modal when the close button is clicked
    closeItemModalBtn.addEventListener('click', () => {
        itemModal.style.display = 'none';
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target == projectModal) {
            projectModal.style.display = 'none';
        }
        if (event.target == itemModal) {
            itemModal.style.display = 'none';
        }
    });

    // Add the project and close the modal when the confirm button is clicked
    confirmAddProject.addEventListener('click', () => {
        const projectName = projectTitleInput.value.trim();
        if (projectName) {
            // Add the project to the projects object
            projects[projectName] = [];

            // Create a new project list item
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');
            projectItem.textContent = projectName;
            projectItem.addEventListener('click', () => {
                // Update bodyTitle with the project name
                bodyTitle.textContent = projectName;

                // Clear the itemListContainer
                itemListContainer.innerHTML = '';

                // Enable the addItemBtn
                addItemBtn.disabled = false;

                // Display the items for the selected project
                projects[projectName].forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('item'); // Add item class for styling

                    // Create and append the title element
                    const itemTitleElement = document.createElement('div');
                    itemTitleElement.classList.add('item-title');
                    itemTitleElement.textContent = item.title;
                    itemElement.appendChild(itemTitleElement);

                    // Create and append the description element
                    const itemDescriptionElement = document.createElement('div');
                    itemDescriptionElement.classList.add('item-description');
                    itemDescriptionElement.textContent = item.description;
                    itemElement.appendChild(itemDescriptionElement);

                    // Create and append the priority element
                    const itemPriorityElement = document.createElement('div');
                    itemPriorityElement.classList.add('item-priority');
                    itemPriorityElement.textContent = item.priority;
                    itemElement.appendChild(itemPriorityElement);

                    itemListContainer.appendChild(itemElement);
                });
            });

            // Add the project item to the project list
            projectListContainer.appendChild(projectItem);

            // Close the modal and reset the input
            projectModal.style.display = 'none';
            projectTitleInput.value = '';

            // Update bodyTitle and itemListContainer to reflect the new project
            bodyTitle.textContent = projectName;
            itemListContainer.innerHTML = '<div>No items yet</div>';
            addItemBtn.disabled = false;
        }
    });

    // Add the item to the selected project and close the modal when the confirm button is clicked
    confirmAddItem.addEventListener('click', () => {
        const itemTitle = itemTitleInput.value.trim();
        const itemDescription = itemDescriptionInput.value.trim();
        const itemPriority = itemPriorityInput.value;

        const currentProject = bodyTitle.textContent;

        if (itemTitle && currentProject in projects) {
            const item = {
                title: itemTitle,
                description: itemDescription,
                priority: itemPriority
            };

            // Add the item to the current project
            projects[currentProject].push(item);

            // Create the item element
            const itemElement = document.createElement('div');
            itemElement.classList.add('item'); // Add item class for styling

            // Create and append the title element
            const itemTitleElement = document.createElement('div');
            itemTitleElement.classList.add('item-title');
            itemTitleElement.textContent = item.title;
            itemElement.appendChild(itemTitleElement);

            // Create and append the description element
            const itemDescriptionElement = document.createElement('div');
            itemDescriptionElement.classList.add('item-description');
            itemDescriptionElement.textContent = item.description;
            itemElement.appendChild(itemDescriptionElement);

            // Create and append the priority element
            const itemPriorityElement = document.createElement('div');
            itemPriorityElement.classList.add('item-priority');
            itemPriorityElement.textContent = item.priority;
            itemElement.appendChild(itemPriorityElement);

            // Add the item element to the itemListContainer
            itemListContainer.appendChild(itemElement);

            // Close the modal and reset the input
            itemModal.style.display = 'none';
            itemTitleInput.value = '';
            itemDescriptionInput.value = '';
            itemPriorityInput.value = 'low';
        }
    });
});
