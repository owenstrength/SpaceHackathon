import json
import os
import requests

def handler(event, context):
  print('received event:')
  print(event)
  auth_code = json.loads(event['body'])['code']
  print(auth_code)
  access_token, username  = get_access_token(auth_code)
  print(access_token)

  # save token to dynamodb
        # dynamodb = boto3.resource('dynamodb')
        # table = dynamodb.Table('WeatherFlowTokens')
        #
        #
        #
        # table.put_item(
        #     Item={
        #
        #         'username': username,
        #         'token': access_token,
        #     }
        # )

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }



def get_access_token(authorization_code):
    token_url = 'https://accounts.spotify.com/api/token'
  
    client_id = os.environ.get('CLIENT_ID')
    client_secret = os.environ.get('CLIENT_SECRET')
    print(client_id)
    print(client_secret)


    token_params = {
        'client_id': client_id,
        'grant_type': 'authorization_code',
        'code': authorization_code,
        'redirect_uri': 'http://localhost:3000/callback'
    }


    response = requests.post(token_url, data=token_params, auth=(client_id, client_secret))

  
    # Extract the access token from the response
    access_token = response.json()['access_token']

    # Write the access token to a json file in the current users directory
    current_user_name = get_endpoint(access_token, 'https://api.spotify.com/v1/me')['display_name']

    print(f'Current user name: {current_user_name}')
    
    return access_token, current_user_name

def get_endpoint(access_token, endpoint=''):
    headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
    }
    try:
        response = requests.get(endpoint, headers=headers, timeout=10)
    except requests.exceptions.Timeout:
        print('The request timed out')
    except requests.RequestException as e:
        print(e)

    return response.json()


