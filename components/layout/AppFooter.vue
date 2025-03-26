<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>FoodFlow</h3>
          <p>Сервис для работы с продуктами питания</p>
        </div>
        
        <div class="footer-links">
          <h4>Навигация</h4>
          <ul>
            <li><NuxtLink to="/">Главная</NuxtLink></li>
            <li><NuxtLink to="/products">Продукты</NuxtLink></li>
            <li><NuxtLink to="/auth/login">Вход</NuxtLink></li>
            <li><NuxtLink to="/auth/register">Регистрация</NuxtLink></li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h4>Контакты</h4>
          <p>Email: info@foodflow.ru</p>
          <p>Телефон: +7 (123) 456-78-90</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} FoodFlow. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 3rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-logo {
  h3 {
    color: var(--secondary-color);
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }
  
  p {
    opacity: 0.8;
    margin-top: 0;
  }
}

.footer-links {
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: white;
        text-decoration: none;
        opacity: 0.8;
        transition: opacity 0.2s ease;
        
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

.footer-contact {
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  
  p {
    margin: 0.5rem 0;
    opacity: 0.8;
  }
}

.footer-bottom {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.6;
  }
}
</style> 