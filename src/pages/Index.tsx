import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [activeSection, setActiveSection] = useState('home');

  const programs = [
    {
      title: 'ОГЭ Подготовка',
      description: 'Комплексная программа подготовки к ОГЭ по математике',
      duration: '8 месяцев',
      lessons: '64 урока',
      price: '3 500 ₽',
      icon: 'Calculator',
    },
    {
      title: 'ЕГЭ Профиль',
      description: 'Углубленная подготовка к профильному ЕГЭ',
      duration: '10 месяцев',
      lessons: '80 уроков',
      price: '4 000 ₽',
      icon: 'GraduationCap',
    },
    {
      title: 'Школьная программа',
      description: 'Помощь в освоении текущей школьной программы',
      duration: 'Гибкий график',
      lessons: 'От 8 уроков',
      price: '2 500 ₽',
      icon: 'BookOpen',
    },
  ];

  const results = [
    { metric: 'Средний балл ЕГЭ', value: '87', change: '+12%' },
    { metric: 'Учеников поступили в вузы', value: '95%', change: '+8%' },
    { metric: 'Улучшили оценки', value: '98%', change: '+5%' },
    { metric: 'Лет опыта', value: '12', change: '' },
  ];

  const reviews = [
    {
      name: 'Мария Петрова',
      rating: 5,
      text: 'Отличный преподаватель! Дочь подготовилась к ЕГЭ на 92 балла. Объясняет понятно и интересно.',
      date: '2 месяца назад',
    },
    {
      name: 'Андрей Смирнов',
      rating: 5,
      text: 'Благодаря занятиям повысил оценку с тройки на пятёрку. Рекомендую всем!',
      date: '1 месяц назад',
    },
    {
      name: 'Екатерина Волкова',
      rating: 5,
      text: 'Профессиональный подход, индивидуальная программа. Сын сдал ОГЭ на отлично!',
      date: '3 недели назад',
    },
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Calculator" className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900">Математика с Игорем</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'about', label: 'Обо мне' },
                { id: 'programs', label: 'Программы' },
                { id: 'results', label: 'Результаты' },
                { id: 'reviews', label: 'Отзывы' },
                { id: 'prices', label: 'Цены' },
                { id: 'contacts', label: 'Контакты' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Запись на урок</DialogTitle>
                  <DialogDescription>
                    Выберите удобную дату и время для занятия
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Выберите дату</h3>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Выберите время</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'default' : 'outline'}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    {selectedTime && date && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-900">
                          Выбрано: {date.toLocaleDateString('ru-RU')} в {selectedTime}
                        </p>
                        <Button className="w-full mt-3 bg-gradient-to-r from-primary to-secondary">
                          Подтвердить запись
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <Badge className="mb-4 bg-blue-100 text-primary hover:bg-blue-200">
                  12 лет опыта • 500+ учеников
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                  Репетитор по математике
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Понимать — это просто, если объясняют правильно
                </p>
                <div className="flex flex-wrap gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Calendar" className="mr-2" size={20} />
                        Записаться на урок
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Запись на урок</DialogTitle>
                        <DialogDescription>
                          Выберите удобную дату и время для занятия
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3">Выберите дату</h3>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3">Выберите время</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? 'default' : 'outline'}
                                onClick={() => setSelectedTime(time)}
                                className="w-full"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                          {selectedTime && date && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">
                                Выбрано: {date.toLocaleDateString('ru-RU')} в {selectedTime}
                              </p>
                              <Button className="w-full mt-3 bg-gradient-to-r from-primary to-secondary">
                                Подтвердить запись
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                    Узнать больше
                  </Button>
                </div>
              </div>
              <div className="relative animate-slide-up">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                  <Icon name="TrendingUp" size={200} className="text-primary/30" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Star" className="text-yellow-500" fill="currentColor" />
                    <span className="font-bold text-2xl">4.9</span>
                  </div>
                  <p className="text-sm text-gray-600">Рейтинг учеников</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Обо мне</h2>
              <p className="text-gray-600">
                Преподаватель математики с 12-летним опытом подготовки к ОГЭ и ЕГЭ
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <CardTitle>Образование</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    МГУ им. Ломоносова, механико-математический факультет. Кандидат физико-математических наук.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Users" className="text-secondary" size={24} />
                  </div>
                  <CardTitle>Опыт</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Более 500 учеников успешно подготовлены к экзаменам. Средний балл ЕГЭ выпускников — 87.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Target" className="text-green-600" size={24} />
                  </div>
                  <CardTitle>Подход</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Индивидуальные программы, современные методики, использование инфографики и визуализации.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="programs" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Программы обучения</h2>
              <p className="text-gray-600">
                Индивидуально подобранные программы для достижения ваших целей
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <Card key={index} className="hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4">
                      <Icon name={program.icon as any} className="text-white" size={32} />
                    </div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                    <CardDescription className="text-base">{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" className="text-gray-400" size={18} />
                        <span className="text-sm text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="BookOpen" className="text-gray-400" size={18} />
                        <span className="text-sm text-gray-600">{program.lessons}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{program.price}</span>
                      <span className="text-sm text-gray-500">за урок</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                          Выбрать программу
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Запись на программу: {program.title}</DialogTitle>
                          <DialogDescription>
                            Выберите удобную дату и время для первого занятия
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-semibold mb-3">Выберите дату</h3>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Выберите время</h3>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  variant={selectedTime === time ? 'default' : 'outline'}
                                  onClick={() => setSelectedTime(time)}
                                  className="w-full"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                            {selectedTime && date && (
                              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">
                                  Выбрано: {date.toLocaleDateString('ru-RU')} в {selectedTime}
                                </p>
                                <Button className="w-full mt-3 bg-gradient-to-r from-primary to-secondary">
                                  Подтвердить запись
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Результаты учеников</h2>
              <p className="text-gray-600">
                Статистика успеха моих учеников за последний год
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {results.map((result, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {result.value}
                    </div>
                    {result.change && (
                      <Badge variant="secondary" className="mb-3 bg-green-100 text-green-700">
                        <Icon name="TrendingUp" size={14} className="mr-1" />
                        {result.change}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600 font-medium">{result.metric}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-16 grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика среднего балла ЕГЭ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['2022: 75 баллов', '2023: 82 балла', '2024: 87 баллов'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all"
                            style={{ width: `${75 + idx * 7}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Успеваемость по классам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { grade: '9 класс (ОГЭ)', percent: 96 },
                      { grade: '10 класс', percent: 92 },
                      { grade: '11 класс (ЕГЭ)', percent: 98 },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.grade}</span>
                          <span className="text-primary font-semibold">{item.percent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                            style={{ width: `${item.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Отзывы учеников</h2>
              <p className="text-gray-600">
                Что говорят мои ученики и их родители
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Icon key={i} name="Star" size={14} className="text-yellow-500" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3">{review.text}</p>
                    <p className="text-sm text-gray-400">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="prices" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Цены и услуги</h2>
              <p className="text-gray-600">
                Прозрачное ценообразование без скрытых платежей
              </p>
            </div>
            <Tabs defaultValue="individual" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="individual">Индивидуальные</TabsTrigger>
                <TabsTrigger value="group">Групповые</TabsTrigger>
              </TabsList>
              <TabsContent value="individual" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Подготовка к ЕГЭ</span>
                      <span className="text-3xl text-primary">4 000 ₽</span>
                    </CardTitle>
                    <CardDescription>90 минут • Индивидуально</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Персональная программа', 'Домашние задания', 'Пробные экзамены', 'Связь 24/7'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={18} />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Подготовка к ОГЭ</span>
                      <span className="text-3xl text-primary">3 500 ₽</span>
                    </CardTitle>
                    <CardDescription>90 минут • Индивидуально</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Персональная программа', 'Домашние задания', 'Пробные экзамены', 'Связь 24/7'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={18} />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Школьная программа</span>
                      <span className="text-3xl text-primary">2 500 ₽</span>
                    </CardTitle>
                    <CardDescription>60 минут • Индивидуально</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Помощь с домашними заданиями', 'Разбор сложных тем', 'Подготовка к контрольным'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={18} />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="group" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Группа ЕГЭ (3-4 человека)</span>
                      <span className="text-3xl text-primary">2 000 ₽</span>
                    </CardTitle>
                    <CardDescription>120 минут • Малая группа</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Групповая программа', 'Домашние задания', 'Пробные экзамены'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={18} />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Группа ОГЭ (3-4 человека)</span>
                      <span className="text-3xl text-primary">1 800 ₽</span>
                    </CardTitle>
                    <CardDescription>120 минут • Малая группа</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {['Групповая программа', 'Домашние задания', 'Пробные экзамены'].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Icon name="Check" className="text-green-600" size={18} />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="contacts" className="py-20 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Контакты</h2>
              <p className="text-gray-600">
                Свяжитесь со мной удобным способом
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Phone" className="text-primary" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Телефон</h3>
                    <p className="text-gray-600">+7 (999) 123-45-67</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Mail" className="text-secondary" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-gray-600">math@tutor.ru</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" className="text-green-600" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Telegram</h3>
                    <p className="text-gray-600">@math_tutor</p>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Video" className="text-purple-600" size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">Онлайн уроки</h3>
                    <p className="text-gray-600">Zoom / Skype</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gradient-to-br from-primary to-secondary text-white">
                <CardContent className="pt-8 pb-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Готовы начать обучение?</h3>
                  <p className="mb-6 opacity-90">
                    Запишитесь на первое бесплатное занятие прямо сейчас
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                        <Icon name="Calendar" className="mr-2" size={20} />
                        Записаться на урок
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Запись на урок</DialogTitle>
                        <DialogDescription>
                          Выберите удобную дату и время для занятия
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold mb-3">Выберите дату</h3>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-3">Выберите время</h3>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? 'default' : 'outline'}
                                onClick={() => setSelectedTime(time)}
                                className="w-full"
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                          {selectedTime && date && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-gray-900">
                                Выбрано: {date.toLocaleDateString('ru-RU')} в {selectedTime}
                              </p>
                              <Button className="w-full mt-3 bg-gradient-to-r from-primary to-secondary">
                                Подтвердить запись
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Репетитор по математике. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;