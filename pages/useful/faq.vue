<template>
  <div class="min-h-screen bg-warm-50 pb-24">
    <!-- Hero Header -->
    <section class="relative py-20 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-warm-50 to-terra-500/5" />
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/40 rounded-full blur-[100px]" />
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100/50 backdrop-blur-md rounded-full border border-primary-200/50 mb-6">
            <span class="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-primary-700">База знаний</span>
          </div>
          <h1 class="font-display font-black text-4xl md:text-6xl text-warm-900 leading-[1.1] tracking-tight mb-6">
            Частые <br/>
            <span class="text-primary-600 italic font-display font-medium">вопросы</span>
          </h1>
          <p class="text-warm-500 text-lg md:text-xl max-w-xl leading-relaxed">
            Мы собрали ответы на самые популярные вопросы о фонде, пристройстве, уходе и волонтёрстве.
          </p>
        </div>
      </div>
    </section>

    <div class="container-custom relative z-10 -mt-8">

      <div class="glass p-8 md:p-12 rounded-[3rem] border-white/60 shadow-lg mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <!-- Sticky Nav / Sidebar -->
          <div class="lg:col-span-4 lg:pr-8 border-r-0 lg:border-r border-warm-200/50">
            <div class="sticky top-24 space-y-6">
              <h2 class="text-2xl font-display font-black text-warm-900">Разделы</h2>
              <ul class="space-y-3 font-medium text-warm-600">
                <li><a href="#general" class="hover:text-primary-600 transition-colors">Общие вопросы</a></li>
                <li><a href="#adoption" class="hover:text-primary-600 transition-colors">Вопросы о пристройстве</a></li>
                <li><a href="#care" class="hover:text-primary-600 transition-colors">Вопросы об уходе</a></li>
                <li><a href="#other" class="hover:text-primary-600 transition-colors">Другие вопросы</a></li>
              </ul>
            </div>
          </div>

          <!-- FAQ Content -->
          <div class="lg:col-span-8 space-y-12">
            
            <!-- General Questions -->
            <div id="general" class="scroll-mt-32">
              <h3 class="text-2xl font-display font-bold text-primary-800 mb-6">Общие вопросы</h3>
              <div class="space-y-3">
                <UiAccordion title="Кто вы и чем занимаетесь?">
                  <p class="text-warm-700 leading-relaxed">
                    Мы — волонтёрская организация, которая спасает, лечит и пристраивает шнауцеров 
                    (ризеншнауцеров, миттельшнауцеров, цвергшнауцеров) и их метисов. 
                    Работаем исключительно на добровольной основе, все средства идут на нужды собак.
                  </p>
                </UiAccordion>

                <UiAccordion title="Берёте ли вы плату за собак?">
                  <p class="text-warm-700 leading-relaxed">
                    Нет, мы не продаём собак. Пристройство абсолютно бесплатное. Иногда мы можем попросить 
                    помочь с транспортными расходами или частично компенсировать стоимость уже проведённого лечения, 
                    но это всегда обсуждается индивидуально и не является обязательным условием.
                  </p>
                </UiAccordion>

                <UiAccordion title="Могу ли я стать волонтёром?">
                  <p class="text-warm-700 leading-relaxed">
                    Конечно! Мы всегда рады помощи. Вы можете помогать с транспортировкой собак, 
                    временной передержкой, распространением информации, сбором средств. 
                    Свяжитесь с нами через раздел «Контакты», и мы расскажем, как присоединиться.
                  </p>
                </UiAccordion>

                <UiAccordion title="Как вы финансируетесь?">
                  <p class="text-warm-700 leading-relaxed">
                    Исключительно за счёт добровольных пожертвований неравнодушных людей. 
                    Мы ведём прозрачную отчётность: публикуем чеки, выкладываем финансовые отчёты по каждой собаке. 
                    Никакого государственного или коммерческого финансирования у нас нет.
                  </p>
                </UiAccordion>
              </div>
            </div>

            <!-- Adoption Questions -->
            <div id="adoption" class="scroll-mt-32">
              <h3 class="text-2xl font-display font-bold text-primary-800 mb-6">Вопросы о пристройстве</h3>
              <div class="space-y-3">
                <UiAccordion title="Как взять собаку из фонда?">
                  <div class="text-warm-700 leading-relaxed space-y-3">
                    <p>Процесс простой:</p>
                    <ol class="list-decimal list-inside space-y-2 font-medium">
                      <li>Выберите собаку на сайте и свяжитесь с куратором</li>
                      <li>Познакомьтесь с собакой лично</li>
                      <li>Заполните анкету</li>
                      <li>Подпишите договор ответственного содержания</li>
                      <li>Заберите собаку домой</li>
                    </ol>
                    <p>Подробнее читайте в разделе «Взять шнауцера».</p>
                  </div>
                </UiAccordion>

                <UiAccordion title="Какие требования к будущим хозяевам?">
                  <p class="text-warm-700 leading-relaxed">
                    Мы хотим быть уверены, что собака попадёт в хорошие руки. Основные требования: 
                    стабильный доход, подходящие условия содержания (достаточно места, возможность выгула), 
                    готовность нести ответственность, любовь к животным. 
                    Мы не пристраиваем собак в семьи с маленькими детьми (до 5 лет), если собака к ним не адаптирована.
                  </p>
                </UiAccordion>

                <UiAccordion title="Можно ли вернуть собаку, если не подошла?">
                  <p class="text-warm-700 leading-relaxed">
                    Да, мы всегда заберём собаку обратно, если что-то пошло не так. 
                    Главное — сообщите куратору как можно раньше. Мы не обижаемся и не осуждаем: 
                    лучше вовремя понять, что не справляетесь, чем мучить и себя, и собаку. 
                    Наша цель — счастье животного.
                  </p>
                </UiAccordion>

                <UiAccordion title="Сколько времени занимает пристройство?">
                  <p class="text-warm-700 leading-relaxed">
                    Зависит от ситуации. Иногда всё происходит за неделю: знакомство, проверка, документы, переезд. 
                    Иногда процесс может растянуться на месяц, если нужно больше времени на адаптацию или проверку условий. 
                    Мы никогда не торопимся, если есть сомнения.
                  </p>
                </UiAccordion>
              </div>
            </div>

            <!-- Care Questions -->
            <div id="care" class="scroll-mt-32">
              <h3 class="text-2xl font-display font-bold text-primary-800 mb-6">Вопросы об уходе</h3>
              <div class="space-y-3">
                <UiAccordion title="Сложно ли ухаживать за шнауцером?">
                  <p class="text-warm-700 leading-relaxed">
                    Шнауцеры — умные, энергичные собаки, требующие регулярного ухода. 
                    Их шерсть нужно триммировать (выщипывать) 2-3 раза в год, регулярно расчёсывать. 
                    Они активны и нуждаются в длительных прогулках и физических нагрузках. 
                    Если вы готовы уделять время — шнауцер станет отличным компаньоном.
                  </p>
                </UiAccordion>

                <UiAccordion title="Подходят ли шнауцеры для квартиры?">
                  <p class="text-warm-700 leading-relaxed">
                    Миттельшнауцеры и цвергшнауцеры отлично чувствуют себя в квартире при условии регулярных прогулок. 
                    Ризеншнауцеры более крупные и активные — им желателен частный дом с участком, 
                    но и в просторной квартире они могут жить комфортно, если обеспечить достаточную физическую нагрузку.
                  </p>
                </UiAccordion>

                <UiAccordion title="Ладят ли шнауцеры с детьми и другими животными?">
                  <p class="text-warm-700 leading-relaxed">
                    Зависит от конкретной собаки и её социализации. Многие шнауцеры прекрасно ладят с детьми и другими питомцами. 
                    Некоторые предпочитают быть единственным любимцем. При выборе собаки куратор обязательно расскажет об особенностях 
                    характера и поможет подобрать подходящего питомца.
                  </p>
                </UiAccordion>

                <UiAccordion title="Что делать, если шнауцер заболел?">
                  <p class="text-warm-700 leading-relaxed">
                    Немедленно обратитесь к ветеринару. Не занимайтесь самолечением. 
                    Если собака из нашего фонда и у вас возникли вопросы — свяжитесь с куратором, 
                    мы всегда поможем советом и поддержкой.
                  </p>
                </UiAccordion>
              </div>
            </div>

            <!-- Other Questions -->
            <div id="other" class="scroll-mt-32">
              <h3 class="text-2xl font-display font-bold text-primary-800 mb-6">Другие вопросы</h3>
              <div class="space-y-3">
                <UiAccordion title="Что делать, если я нашёл шнауцера на улице?">
                  <p class="text-warm-700 leading-relaxed">
                    Свяжитесь с нами через контакты или форум. Мы поможем определить, есть ли у собаки хозяин, 
                    организуем проверку чипа, размещение объявления. Если хозяин не найдётся — возьмём собаку под опеку 
                    и найдём ей новый дом.
                  </p>
                </UiAccordion>

                <UiAccordion title="Могу ли я помочь финансово?">
                  <p class="text-warm-700 leading-relaxed">
                    Да, любая помощь важна. Вы можете сделать пожертвование на лечение конкретной собаки 
                    или на общие нужды фонда. Реквизиты указаны в разделе «Контакты». 
                    Мы всегда публикуем отчёты о расходах.
                  </p>
                </UiAccordion>

                <UiAccordion title="Не нашёл ответа на свой вопрос">
                  <p class="text-warm-700 leading-relaxed">
                    Напишите нам через раздел «Контакты» или задайте вопрос на форуме. 
                    Мы обязательно ответим!
                  </p>
                </UiAccordion>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// SEO
useHead({
  title: 'ЧаВо',
  meta: [
    { name: 'description', content: 'Ответы на часто задаваемые вопросы о фонде помощи шнауцерам, пристройстве и уходе за собаками.' }
  ]
})
</script>
