import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту faktura.elit@yandex.ru"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    area = body.get('area', '').strip()
    color = body.get('color', '').strip()
    house_type = body.get('houseType', '').strip()
    wall_material = body.get('wallMaterial', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    smtp_user = 'faktura.elit@yandex.ru'
    smtp_password = os.environ['SMTP_PASSWORD1']

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка с сайта — {name}'
    msg['From'] = smtp_user
    msg['To'] = 'Faktura.138@yandex.ru'

    rows = ''
    if house_type:
        rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Тип объекта</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{house_type}</td></tr>'
    if wall_material:
        rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Материал стен</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{wall_material}</td></tr>'
    if area:
        rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Площадь</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{area} м²</td></tr>'
    if color:
        rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Цвет</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{color}</td></tr>'
    rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Имя</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{name}</td></tr>'
    rows += f'<tr><td style="padding: 8px 12px; background: #f5f0eb; font-weight: bold;">Телефон</td><td style="padding: 8px 12px; border: 1px solid #ddd;">{phone}</td></tr>'

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #B5472A;">Новая заявка с сайта Фактура Элит</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        {rows}
      </table>
    </body></html>
    """
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, 'Faktura.138@yandex.ru', msg.as_string())

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'ok': True})
    }