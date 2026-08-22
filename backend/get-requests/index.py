import os
import json
import psycopg2
import psycopg2.extras


def handler(event: dict, context) -> dict:
    """Получение списка заявок с сайта для админ-страницы (требует пароль)"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    headers = event.get('headers', {}) or {}
    password = headers.get('X-Admin-Password') or headers.get('x-admin-password') or ''
    admin_password = os.environ.get('ADMIN_PASSWORD', '')

    if not admin_password or not password or password != admin_password:
        return {
            'statusCode': 401,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Неверный пароль'})
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(
                "SELECT id, name, phone, house_type, wall_material, area, color, created_at "
                "FROM requests ORDER BY created_at DESC"
            )
            rows = cur.fetchall()
    finally:
        conn.close()

    requests_list = []
    for r in rows:
        requests_list.append({
            'id': r['id'],
            'name': r['name'],
            'phone': r['phone'],
            'houseType': r['house_type'],
            'wallMaterial': r['wall_material'],
            'area': r['area'],
            'color': r['color'],
            'createdAt': r['created_at'].isoformat() if r['created_at'] else None,
        })

    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({'requests': requests_list})
    }