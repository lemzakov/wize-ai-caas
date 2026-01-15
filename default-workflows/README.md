# Default Workflows / Шаблоны рабочих процессов по умолчанию

This directory contains default workflow templates for the WIZE platform.

Эта директория содержит шаблоны рабочих процессов по умолчанию для платформы WIZE.

## Структура / Structure

```
default-workflows/
├── automotive/          # Автомобильные процессы подписки
│   └── subscription-onboarding.json
├── customer-service/    # Процессы обслуживания клиентов
├── notification/        # Процессы уведомлений
├── payment/            # Платежные процессы
└── general/            # Общие процессы
```

## Использование / Usage

Для добавления нового шаблона рабочего процесса:

1. Создайте JSON-файл с определением рабочего процесса в соответствующей категории
2. Добавьте запись в таблицу `default_workflow` в базе данных
3. Используйте руководство `DEFAULT_WORKFLOWS_MANUAL_RU.md` для подробных инструкций

To add a new workflow template:

1. Create a JSON file with the workflow definition in the appropriate category
2. Add a record to the `default_workflow` table in the database
3. Refer to `DEFAULT_WORKFLOWS_MANUAL_RU.md` for detailed instructions

## Доступные шаблоны / Available Templates

### Automotive (Автомобильные процессы)

- **subscription-onboarding.json** - Процесс регистрации новой подписки на автомобиль
  - Создание записи клиента
  - Отправка приветственного письма
  - Уведомление команды

## Документация / Documentation

Полное руководство доступно в файле: `DEFAULT_WORKFLOWS_MANUAL_RU.md`

Full guide available in: `DEFAULT_WORKFLOWS_MANUAL_RU.md`
