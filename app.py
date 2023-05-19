#!/usr/bin/env python3
import os
import subprocess
import sys
import traceback
import shlex
from bottle import route, run, template, request, post, HTTPResponse, static_file, redirect

_DEFAULT_HTTP_PORT = 8080
_DEFAULT_ADDRESS = "localhost"
_DEFAULT_AD = "127.0.0.1"

_APP_PATH = os.path.dirname(os.path.abspath(__file__))

_use_sudo = False
_host = _DEFAULT_AD


def _call_tool(username, oldpassword, newpassword):
    args = ["sudo"]
    input_param = None
    args += ["samba-tool", "user", "password", "--ipaddress", _host, "--username", shlex.quote(username), "--password", shlex.quote(oldpassword), "--newpassword", shlex.quote(newpassword)]

    if not _use_sudo:
        args = args[1:]
    try:
        print(args)
        proc = subprocess.Popen(args, stdout=subprocess.DEVNULL, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
        _, std_err = proc.communicate(input=input_param)
        if proc.returncode == 0:
            return True
        else:
            print("smbpasswd returned", proc.returncode)
            print("stderr:", std_err.decode("UTF-8"))
            return False
    except Exception as e:
        print("Failed to change user password!")
        traceback.print_exc(file=sys.stdout)
        return False


@post('/api/set_password')
def set_password():
    if "username" not in request.json or "oldpassword" not in request.json or "newpassword" not in request.json:
        return HTTPResponse(status=400, body="Invalid API request.")
    
    oldpassword = request.json["oldpassword"]
    newpassword = request.json["newpassword"]
    username = request.json["username"]

    if _call_tool(username, oldpassword, newpassword):
        return {"status":"OK"}

    return HTTPResponse(status=500, body="Could not set password.")

@route("/")
def index():
    redirect("/index.html")

@route('/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root=f"{_APP_PATH}/static")

_use_sudo = os.getenv("USE_SUDO", "false").lower() == "true"
_host = os.getenv("SAMBA_HOST", _DEFAULT_AD)

run(host=os.getenv("LISTEN_ADDRESS", _DEFAULT_ADDRESS), port=int(os.getenv("LISTEN_PORT", _DEFAULT_HTTP_PORT)))