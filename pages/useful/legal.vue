<template>
  <div class="py-12 md:py-16">
    <div class="container-custom max-w-4xl">
      <h1 class="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
        Юридический отдел
      </h1>
      <p class="text-xl text-warm-700 mb-12">
        Правовая информация для владельцев собак, волонтёров и всех, кто хочет защитить права животных.
      </p>

      <!-- Animal Rights -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Права животных в РФ</h2>
        <div class="prose prose-warm max-w-none text-warm-700 space-y-4">
          <p>
            В России действует Федеральный закон «Об ответственном обращении с животными» от 27.12.2018 № 498-ФЗ. 
            Этот закон регулирует отношения в области обращения с животными, защищает их от жестокости и определяет 
            ответственность владельцев.
          </p>
          <p>
            Основные принципы закона:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Отношение к животным как к существам, способным испытывать эмоции и физические страдания</li>
            <li>Ответственность человека за судьбу животного</li>
            <li>Воспитание нравственного и гуманного отношения к животным</li>
            <li>Научно обоснованное сочетание нравственных и экономических интересов</li>
          </ul>
        </div>
      </UiCard>

      <!-- Owner Responsibilities -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Обязанности владельца</h2>
        <div class="text-warm-700 space-y-4">
          <p>Владелец собаки обязан:</p>
          <div class="bg-warm-100 rounded-lg p-5 space-y-3">
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Обеспечивать надлежащий уход, своевременное кормление, поение</span>
            </div>
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Предоставлять животному ветеринарную помощь</span>
            </div>
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Обеспечивать безопасность граждан при выгуле собаки</span>
            </div>
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Не допускать неконтролируемого размножения</span>
            </div>
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Регистрировать и маркировать животное (чипирование, клеймо)</span>
            </div>
            <div class="flex items-start">
              <span class="text-primary-500 mr-3 mt-1">✓</span>
              <span>Убирать продукты жизнедеятельности животного в общественных местах</span>
            </div>
          </div>
        </div>
      </UiCard>

      <!-- Cruelty -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Жестокое обращение и ответственность</h2>
        <div class="prose prose-warm max-w-none text-warm-700 space-y-4">
          <p>
            За жестокое обращение с животными предусмотрена уголовная ответственность (ст. 245 УК РФ).
          </p>
          <div class="bg-red-50 border border-red-200 rounded-lg p-5">
            <h3 class="font-semibold text-red-900 mb-3">Жестоким обращением считается:</h3>
            <ul class="list-disc list-inside space-y-2 text-red-800">
              <li>Побои, истязания, причинение боли и страданий</li>
              <li>Использование животных в боях</li>
              <li>Лишение пищи, воды, содержание в неподходящих условиях</li>
              <li>Оставление животного в опасности</li>
              <li>Использование животных в ненаучных целях с причинением боли</li>
            </ul>
          </div>
          <p>
            Наказание: штраф до 80 000 рублей, обязательные или исправительные работы, либо лишение свободы до 3 лет 
            (при наличии отягчающих обстоятельств — до 5 лет).
          </p>
        </div>
      </UiCard>

      <!-- Abandonment -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Что делать, если не можете содержать собаку</h2>
        <div class="prose prose-warm max-w-none text-warm-700 space-y-4">
          <p>
            Бросать животное на улице — это жестокое обращение и преступление. Если вы оказались в ситуации, 
            когда не можете больше содержать собаку:
          </p>
          <ol class="list-decimal list-inside space-y-2 ml-4">
            <li>Свяжитесь с нами или другим фондом помощи животным</li>
            <li>Разместите объявление о поиске новых хозяев</li>
            <li>Обратитесь в приют (важно: не все приюты принимают собак от владельцев)</li>
            <li>Попросите помощи у знакомых, родственников для временной передержки</li>
          </ol>
          <p>
            Мы готовы помочь в пристройстве вашей собаки. Свяжитесь с нами через раздел «Контакты».
          </p>
        </div>
      </UiCard>

      <!-- Adoption Contract -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Договор о передаче животного</h2>
        <div class="prose prose-warm max-w-none text-warm-700 space-y-4">
          <p>
            При пристройстве собаки мы заключаем договор ответственного содержания. 
            Этот документ защищает интересы животного и определяет обязанности новых владельцев.
          </p>
          <p>
            Основные пункты договора:
          </p>
          <ul class="list-disc list-inside space-y-2 ml-4">
            <li>Данные передающей и принимающей сторон</li>
            <li>Описание животного (порода, возраст, особенности)</li>
            <li>Обязательства новых владельцев по содержанию и уходу</li>
            <li>Право фонда на проверку условий содержания</li>
            <li>Обязательство вернуть собаку в фонд, если не можете больше содержать</li>
            <li>Запрет на передачу собаки третьим лицам без согласия фонда</li>
          </ul>
        </div>
      </UiCard>

      <!-- Lost and Found -->
      <UiCard class="mb-8">
        <h2 class="text-2xl font-display font-bold text-warm-900 mb-4">Нашли собаку: юридические аспекты</h2>
        <div class="prose prose-warm max-w-none text-warm-700 space-y-4">
          <p>
            Если вы нашли собаку, по закону вы обязаны:
          </p>
          <ol class="list-decimal list-inside space-y-2 ml-4">
            <li>Попытаться найти владельца (объявления, соцсети, проверка чипа в ветклинике)</li>
            <li>Сообщить о находке в местные органы или приют</li>
            <li>Обеспечить животному временный уход</li>
          </ol>
          <p>
            Если владелец не найден в течение 6 месяцев, вы можете оставить собаку себе или передать в 
            приют/фонд. Важно: нельзя просто присвоить найденное животное без попыток поиска владельца.
          </p>
        </div>
      </UiCard>

      <!-- Help -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-8 text-center">
        <h2 class="text-2xl font-display font-bold text-primary-900 mb-4">
          Нужна юридическая консультация?
        </h2>
        <p class="text-primary-800 mb-6">
          Мы не являемся юристами, но можем порекомендовать специалистов или помочь разобраться в базовых вопросах.
        </p>
        <UiButton to="/contacts" variant="primary">
          Связаться с нами
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'Юридический отдел',
  meta: [
    { name: 'description', content: 'Правовая информация о защите прав животных, обязанностях владельцев собак и ответственности за жестокое обращение.' }
  ]
})
</script>
