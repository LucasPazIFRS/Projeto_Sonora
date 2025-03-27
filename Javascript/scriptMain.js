        function toggleTextBox() {
            const textBox = document.getElementById('textBox');
            textBox.style.display = textBox.style.display === 'block' ? 'none' : 'block';
        }
        
        document.addEventListener("DOMContentLoaded", function () {
            function toggleTextBox() {
                const textBox = document.getElementById('textBox');
                if (textBox) {
                    textBox.style.display = textBox.style.display === 'block' ? 'none' : 'block';
                }
            }
        
            const menuButton = document.getElementById("menuButton");
            const quickMenu = document.getElementById("quickMenu");
            const closeMenuButton = document.getElementById("closeMenuButton");
        
            if (menuButton && quickMenu) {
                menuButton.addEventListener("click", function () {
                    quickMenu.classList.toggle("hidden");
                });
            }
        
            if (closeMenuButton && quickMenu) {
                closeMenuButton.addEventListener("click", function () {
                    quickMenu.classList.add("hidden");
                    window.location.href = "index.html"; // Alterar conforme necessário
                });
            }
        });
        