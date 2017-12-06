import logging.config
import mysql.connector

logging.config.fileConfig(fname='./log.config')
logger = logging.getLogger('analyze')
user = 'zhangsh'
password = '000000'
host = 'g.sep.com'
db = 'stock'
cnx = mysql.connector.connect(user=user, password=password, host=host, database=db)
cursor = cnx.cursor()

cursor.execute("select * from stock where code='sh000001' and date > '2017-11-20'")
res = cursor.fetchall()
print(res)

print('Hello, work!')
logger.error('error message')
